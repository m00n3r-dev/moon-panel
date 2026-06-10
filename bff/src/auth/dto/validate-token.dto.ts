import { IsString } from 'class-validator';

export class ValidateTokenDto {
  @IsString()
  jwt_token!: string;
}
