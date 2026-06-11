import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/PrismaService';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ValidateTokenResult } from './types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<string | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    const token = await this.jwtService.signAsync({
      user_id: user.id,
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
    });

    return token;
  }

  async validateToken(
    token: string,
  ): Promise<ValidateTokenResult | { valid: false }> {
    try {
      const payload = await this.jwtService.verifyAsync<{
        user_id: string;
        email: string;
        first_name: string;
        last_name: string;
      }>(token);
      return { valid: true, ...payload };
    } catch {
      return { valid: false };
    }
  }
}
