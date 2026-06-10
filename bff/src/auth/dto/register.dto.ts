import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  first_name!: string;

  @IsString()
  @MinLength(6)
  last_name!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}
