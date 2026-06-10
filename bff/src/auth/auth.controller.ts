import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { AuthServiceClient } from './types';
import { firstValueFrom } from 'rxjs';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ValidateTokenDto } from './dto/validate-token.dto';

@Controller('api/auth')
export class AuthController implements OnModuleInit {
  @Inject('AUTH_SERVICE') private client!: ClientGrpc;
  private authService!: AuthServiceClient;

  onModuleInit() {
    this.authService = this.client.getService<AuthServiceClient>('AuthService');
  }

  @Post('login')
  async login(@Body() data: LoginDto) {
    return await firstValueFrom(this.authService.Login(data));
  }

  @Post('register')
  async register(
    @Body()
    data: RegisterDto,
  ) {
    return await firstValueFrom(this.authService.Register(data));
  }

  @Post('validate-token')
  async validateToken(@Body() data: ValidateTokenDto) {
    return await firstValueFrom(this.authService.ValidateToken(data));
  }
}
