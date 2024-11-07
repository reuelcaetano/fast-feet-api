import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/infra/auth/current-user-decorator';
import { JWTAuthGuard } from 'src/infra/auth/jwt-auth.guard';
import { UserPayload } from 'src/infra/auth/jwt.strategy';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { z } from 'zod';

const createDeliveryManBodySchema = z.object({
  name: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(createDeliveryManBodySchema);

type CreateDeliveryManBodySchema = z.infer<typeof createDeliveryManBodySchema>;

@Controller('/deliverymen')
@UseGuards(JWTAuthGuard)
export class CreateDeliveryManController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateDeliveryManBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    if (user.role != 'admin') {
      throw new UnauthorizedException();
    }

    const { name } = body;

    await this.prisma.deliveryMan.create({
      data: {
        name,
        longitude: 0,
        latitude: 0,
      },
    });
  }
}
