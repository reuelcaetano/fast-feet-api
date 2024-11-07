import {
  Body,
  Controller,
  Delete,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/infra/auth/current-user-decorator';
import { JWTAuthGuard } from 'src/infra/auth/jwt-auth.guard';
import { UserPayload } from 'src/infra/auth/jwt.strategy';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { z } from 'zod';

const deletePacketBodySchema = z.object({
  id: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(deletePacketBodySchema);

type DeletePacketBodySchema = z.infer<typeof deletePacketBodySchema>;

@Controller('/packets')
@UseGuards(JWTAuthGuard)
export class DeletePacketController {
  constructor(private prisma: PrismaService) {}

  @Delete()
  async handle(
    @Body(bodyValidationPipe) body: DeletePacketBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    if (user.role != 'admin') {
      throw new UnauthorizedException();
    }

    const { id } = body;

    await this.prisma.packet.delete({
      where: {
        id,
      },
    });
  }
}
