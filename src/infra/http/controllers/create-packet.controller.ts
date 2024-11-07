import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

const createPacketBodySchema = z.object({
  longitude: z.string(),
  latitude: z.string(),
  imageId: z.string(),
  recipientId: z.string(),
});

type CreatePacketBodySchema = z.infer<typeof createPacketBodySchema>;

@Controller('/packets')
export class CreatePacketController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createPacketBodySchema))
  async handle(@Body() body: CreatePacketBodySchema) {
    const { longitude, latitude, imageId, recipientId } = body;

    await this.prisma.packet.create({
      data: {
        latitude: Number(latitude),
        longitude: Number(longitude),
        imageId,
        recipientId,
        availableAt: null,
        deliveredAt: null,
        returnedAt: null,
      },
    });
  }
}
