import { Controller, Param, Patch, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { z } from 'zod';

const packetAvailableBodySchema = z.object({
  id: z.string(),
});

type PacketAvailableBodySchema = z.infer<typeof packetAvailableBodySchema>;

@Controller('/packets/:id/available')
export class PacketAvailableController {
  constructor(private prisma: PrismaService) {}

  @Patch()
  @UsePipes(new ZodValidationPipe(packetAvailableBodySchema))
  async handle(@Param() param: PacketAvailableBodySchema) {
    const { id } = param;

    await this.prisma.packet.update({
      where: {
        id,
      },
      data: {
        availableAt: new Date(),
      },
    });
  }
}
