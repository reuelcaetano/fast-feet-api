import {
  Controller,
  Get,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { CurrentUser } from 'src/infra/auth/current-user-decorator';
import { UserPayload } from 'src/infra/auth/jwt.strategy';
import { JWTAuthGuard } from 'src/infra/auth/jwt-auth.guard';

@Controller('/packets/nearby')
@UseGuards(JWTAuthGuard)
export class GetPacketsNearbyController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const deliverys = await this.prisma.deliveryMan.findMany({
      where: {
        userId: user.sub,
      },
    });

    if (deliverys.length === 0) {
      throw new UnauthorizedException();
    }

    const packets = await this.prisma.packet.findMany({
      where: {
        deliveryManId: deliverys[0].id,
      },
    });

    return packets;
  }
}
