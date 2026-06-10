import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GrpcExceptionFilter } from './filters/grpc-exception.filter';
import { getEnv } from './lib/envHelper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new GrpcExceptionFilter());
  await app.listen(getEnv('PORT', '3000')!);
}
bootstrap();
