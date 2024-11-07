import { Controller, Param, Patch, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { z } from 'zod';

const packetReturnBodySchema = z.object({
  id: z.string(),
});

type PacketReturnBodySchema = z.infer<typeof packetReturnBodySchema>;

@Controller('/packets/:id/return')
export class PacketReturnController {
  constructor(private prisma: PrismaService) {}

  @Patch()
  @UsePipes(new ZodValidationPipe(packetReturnBodySchema))
  async handle(@Param() param: PacketReturnBodySchema) {
    const { id } = param;

    await this.prisma.packet.update({
      where: {
        id,
      },
      data: {
        returnedAt: new Date(),
      },
    });
  }
}
