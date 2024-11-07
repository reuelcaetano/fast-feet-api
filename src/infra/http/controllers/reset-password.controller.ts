import {
  Body,
  Controller,
  Patch,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { z } from 'zod';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { CurrentUser } from 'src/infra/auth/current-user-decorator';
import { UserPayload } from 'src/infra/auth/jwt.strategy';
import { JWTAuthGuard } from 'src/infra/auth/jwt-auth.guard';
import { hash } from 'bcryptjs';

const resetPasswordBodySchema = z.object({
  new_password: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(resetPasswordBodySchema);

type ResetPasswordBodySchema = z.infer<typeof resetPasswordBodySchema>;

@Controller('/accounts')
@UseGuards(JWTAuthGuard)
export class ResetPasswordController {
  constructor(private prisma: PrismaService) {}

  @Patch()
  async handle(
    @Body(bodyValidationPipe) body: ResetPasswordBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { new_password } = body;
    if (user.role != 'admin') {
      throw new UnauthorizedException();
    }

    await this.prisma.user.update({
      where: {
        id: user.sub,
      },
      data: {
        password: await hash(new_password, 8),
      },
    });
  }
}
