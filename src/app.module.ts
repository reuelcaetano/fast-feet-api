import { Module } from '@nestjs/common';
import { AuthModule } from './infra/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { HttpModule } from './infra/http/http.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
  ],
})
export class AppModule {}
