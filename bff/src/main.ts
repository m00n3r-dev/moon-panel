import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GrpcExceptionFilter } from './filters/grpc-exception.filter';
import { getEnv } from './lib/envHelper';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new GrpcExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.setGlobalPrefix('api');

  await app.listen(getEnv('BFF_PORT', '3001')!);
}
bootstrap();
