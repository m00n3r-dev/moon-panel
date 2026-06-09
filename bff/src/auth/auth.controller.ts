import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { AuthServiceClient } from './types';
import { firstValueFrom } from 'rxjs';

@Controller('api/auth')
export class AuthController implements OnModuleInit {
  @Inject('AUTH_SERVICE') private client!: ClientGrpc;
  private authService!: AuthServiceClient;

  onModuleInit() {
    this.authService =
      this.client.getService<AuthServiceClient>('AUTH_SERVICE');
  }

  @Post('login')
  async login(@Body() data: { email: string; password: string }) {
    return await firstValueFrom(this.authService.Login(data));
  }

  @Post('register')
  async register(
    @Body()
    data: {
      email: string;
      first_name: string;
      last_name: string;
      password: string;
    },
  ) {
    return await firstValueFrom(this.authService.Register(data));
  }

  @Post('validate-token')
  async validateToken(@Body() data: { jwtToken: string }) {
    return await firstValueFrom(this.authService.ValidateToken(data));
  }
}
