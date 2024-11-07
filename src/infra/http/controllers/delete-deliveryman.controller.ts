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

const deleteDeliveryManBodySchema = z.object({
  id: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(deleteDeliveryManBodySchema);

type DeleteDeliveryManBodySchema = z.infer<typeof deleteDeliveryManBodySchema>;

@Controller('/deliverymen')
@UseGuards(JWTAuthGuard)
export class DeleteDeliveryManController {
  constructor(private prisma: PrismaService) {}

  @Delete()
  async handle(
    @Body(bodyValidationPipe) body: DeleteDeliveryManBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    if (user.role != 'admin') {
      throw new UnauthorizedException();
    }

    const { id } = body;

    await this.prisma.deliveryMan.delete({
      where: {
        id,
      },
    });
  }
}
