import { Body, Controller, Patch, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { z } from 'zod';

const loadPacketBodySchema = z.object({
  id: z.string(),
  deliveryManId: z.string(),
});

type LoadPacketBodySchema = z.infer<typeof loadPacketBodySchema>;

@Controller('/packets')
export class LoadPacketController {
  constructor(private prisma: PrismaService) {}

  @Patch()
  @UsePipes(new ZodValidationPipe(loadPacketBodySchema))
  async handle(@Body() body: LoadPacketBodySchema) {
    const { id, deliveryManId } = body;

    await this.prisma.packet.update({
      where: {
        id,
      },
      data: {
        deliveryManId,
      },
    });
  }
}
