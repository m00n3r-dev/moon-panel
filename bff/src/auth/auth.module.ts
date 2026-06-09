import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientsModule } from '@nestjs/microservices';
import { buildClientModule } from '../lib/GrpHelper';

@Module({
  imports: [
    ClientsModule.register([
      buildClientModule(
        'AUTH_SERVICE',
        'auth.v1',
        'AUTH',
        'auth/v1/auth.proto',
      ),
    ]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
