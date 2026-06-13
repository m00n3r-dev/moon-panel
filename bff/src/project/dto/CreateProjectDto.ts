import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsIn(['nodejs', 'php', 'reverse-proxy'])
  type: string;

  @IsNumber()
  @IsNotEmpty()
  version: number;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsNumber()
  @IsOptional()
  cpu?: number;

  @IsNumber()
  @IsOptional()
  memory?: number;

  @IsNumber()
  @IsOptional()
  storage?: number;
}
