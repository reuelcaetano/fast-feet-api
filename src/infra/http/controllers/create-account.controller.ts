import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { z } from 'zod';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

const createAccountBodySchema = z.object({
  cpf: z.string(),
  password: z.string(),
  role: z.string(),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { cpf, password, role } = body;

    await this.prisma.user.create({
      data: {
        cpf,
        password: await hash(password, 8),
        role,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    });
  }
}
