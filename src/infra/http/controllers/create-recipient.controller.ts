import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { z } from 'zod';

const createRecipientBodySchema = z.object({
  name: z.string(),
});

type CreateRecipientBodySchema = z.infer<typeof createRecipientBodySchema>;

@Controller('/recipients')
export class CreateRecipientController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createRecipientBodySchema))
  async handle(@Body() body: CreateRecipientBodySchema) {
    const { name } = body;

    await this.prisma.recipient.create({
      data: {
        name,
      },
    });
  }
}
