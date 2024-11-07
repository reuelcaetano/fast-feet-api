import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthenticateController } from './controllers/authenticate.controller';
import { CreateAccountController } from './controllers/create-account.controller';
import { CreateRecipientController } from './controllers/create-recipient.controller';
import { CreatePacketController } from './controllers/create-packet.controller';
import { CreateDeliveryManController } from './controllers/create-deliveryman.controller';
import { PacketAvailableController } from './controllers/packet-available.controller';
import { PacketDeliveryController } from './controllers/packet-delivery.controller';
import { PacketReturnController } from './controllers/packet-return.controller';
import { ResetPasswordController } from './controllers/reset-password.controller';
import { UpdateDeliveryManController } from './controllers/update-deliveryman.controller';
import { DeleteDeliveryManController } from './controllers/delete-deliveryman.controller';
import { UpdatePacketController } from './controllers/update-packet.controller';
import { DeletePacketController } from './controllers/delete-packet.controller';
import { UpdateRecipientController } from './controllers/update-recipient.controller';
import { DeleteRecipientController } from './controllers/delete-recipient.controller';
import { LoadPacketController } from './controllers/load-packet.controller';
import { GetPacketsController } from './controllers/get-packets.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    ResetPasswordController,
    AuthenticateController,
    CreateDeliveryManController,
    UpdateDeliveryManController,
    DeleteDeliveryManController,
    CreateRecipientController,
    UpdateRecipientController,
    DeleteRecipientController,
    GetPacketsController,
    CreatePacketController,
    UpdatePacketController,
    DeletePacketController,
    LoadPacketController,
    PacketAvailableController,
    PacketDeliveryController,
    PacketReturnController,
  ],
})
export class HttpModule {}
