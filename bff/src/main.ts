import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GrpcExecptionFilter } from './filters/grpc-exception.execption.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GrpcExecptionFilter())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
