import {
  Controller,
  Param,
  Patch,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { CurrentUser } from 'src/infra/auth/current-user-decorator';
import { UserPayload } from 'src/infra/auth/jwt.strategy';
import { JWTAuthGuard } from 'src/infra/auth/jwt-auth.guard';

@Controller('/packets/:id/delivery')
@UseGuards(JWTAuthGuard)
export class PacketDeliveryController {
  constructor(private prisma: PrismaService) {}

  @Patch()
  async handle(@CurrentUser() user: UserPayload, @Param() param: any) {
    const { id } = param;

    const deliverys = await this.prisma.deliveryMan.findMany({
      where: {
        userId: user.sub,
      },
    });

    const packet = await this.prisma.packet.findUnique({
      where: {
        id,
      },
    });

    if (packet?.deliveryManId != deliverys[0].id) {
      throw new UnauthorizedException();
    }

    await this.prisma.packet.update({
      where: {
        id,
      },
      data: {
        deliveredAt: new Date(),
      },
    });
  }
}
