import { IsIn, IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

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

  @IsUrl()
  @IsNotEmpty()
  url: string;
}
