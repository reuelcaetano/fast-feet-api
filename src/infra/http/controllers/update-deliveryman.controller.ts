import {
  Body,
  Controller,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/infra/auth/current-user-decorator';
import { JWTAuthGuard } from 'src/infra/auth/jwt-auth.guard';
import { UserPayload } from 'src/infra/auth/jwt.strategy';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { z } from 'zod';

const updateDeliveryManBodySchema = z.object({
  id: z.string(),
  name: z.string(),
  latitude: z.string(),
  longitude: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(updateDeliveryManBodySchema);

type UpdateDeliveryManBodySchema = z.infer<typeof updateDeliveryManBodySchema>;

@Controller('/deliverymen')
@UseGuards(JWTAuthGuard)
export class UpdateDeliveryManController {
  constructor(private prisma: PrismaService) {}

  @Put()
  async handle(
    @Body(bodyValidationPipe) body: UpdateDeliveryManBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    if (user.role != 'admin') {
      throw new UnauthorizedException();
    }

    const { id, name, latitude, longitude } = body;

    await this.prisma.deliveryMan.update({
      where: {
        id,
      },
      data: {
        name,
        latitude,
        longitude,
      },
    });
  }
}
