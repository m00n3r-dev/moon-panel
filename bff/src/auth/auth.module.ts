import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { getEnv } from '../lib/envHelper';
import { PrismaService } from '../lib/PrismaService';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: getEnv('JWT_SECRET'),
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
