import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ValidateTokenResult } from './types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization?.split(' ')[1]; // "Bearer <token>"

    if (!token) return false;

    try {
      const payload =
        await this.jwtService.verifyAsync<ValidateTokenResult>(token);
      (request as any).user = payload;
      return true;
    } catch {
      return false;
    }
  }
}
