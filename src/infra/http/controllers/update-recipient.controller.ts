import { Body, Controller, Put, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { z } from 'zod';

const updateRecipientBodySchema = z.object({
  id: z.string(),
  name: z.string(),
});

type UpdateRecipientBodySchema = z.infer<typeof updateRecipientBodySchema>;

@Controller('/recipients')
export class UpdateRecipientController {
  constructor(private prisma: PrismaService) {}

  @Put()
  @UsePipes(new ZodValidationPipe(updateRecipientBodySchema))
  async handle(@Body() body: UpdateRecipientBodySchema) {
    const { id, name } = body;

    await this.prisma.recipient.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }
}
