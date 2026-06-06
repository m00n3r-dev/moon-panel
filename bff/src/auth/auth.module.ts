import { Module } from '@nestjs/common';
import { GrpcClient } from '../grpc/grpc.client';
import { AuthController } from './auth.controller';

@Module({
  providers: [GrpcClient],
  controllers: [AuthController],
})
export class AuthModule {}
