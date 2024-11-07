import { Body, Controller, Put, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { z } from 'zod';

const updatePacketBodySchema = z.object({
  id: z.string(),
  longitude: z.string(),
  latitude: z.string(),
  imageId: z.string(),
  recipientId: z.string(),
});

type UpdatePacketBodySchema = z.infer<typeof updatePacketBodySchema>;

@Controller('/packets')
export class UpdatePacketController {
  constructor(private prisma: PrismaService) {}

  @Put()
  @UsePipes(new ZodValidationPipe(updatePacketBodySchema))
  async handle(@Body() body: UpdatePacketBodySchema) {
    const { id, longitude, latitude, imageId, recipientId } = body;

    await this.prisma.packet.update({
      where: {
        id,
      },
      data: {
        latitude: Number(latitude),
        longitude: Number(longitude),
        imageId,
        recipientId,
      },
    });
  }
}
