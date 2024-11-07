import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { JwtService } from '@nestjs/jwt';
import { z } from 'zod';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { compare } from 'bcryptjs';

const createAccountBodySchema = z.object({
  cpf: z.string(),
  password: z.string(),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller('/sessions')
export class AuthenticateController {
  constructor(
    private readonly jwt: JwtService,
    private prisma: PrismaService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { cpf, password } = body;

    const user = await this.prisma.user.findUnique({
      where: {
        cpf: cpf,
      },
    });

    if (!user) {
      throw new BadRequestException('Credentials error');
    }

    const isValid = await compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException();
    }

    const token = this.jwt.sign({
      sub: user.id,
      role: user.role,
    });

    return token;
  }
}
