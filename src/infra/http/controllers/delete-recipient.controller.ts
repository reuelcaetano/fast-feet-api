import { Body, Controller, Delete, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { z } from 'zod';

const deleteRecipientBodySchema = z.object({
  id: z.string(),
});

type DeleteRecipientBodySchema = z.infer<typeof deleteRecipientBodySchema>;

@Controller('/recipients')
export class DeleteRecipientController {
  constructor(private prisma: PrismaService) {}

  @Delete()
  @UsePipes(new ZodValidationPipe(deleteRecipientBodySchema))
  async handle(@Body() body: DeleteRecipientBodySchema) {
    const { id } = body;

    await this.prisma.recipient.delete({
      where: {
        id,
      },
    });
  }
}
