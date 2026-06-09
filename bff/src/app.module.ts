import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from '@nestjs/microservices';
import { buildClientModule } from './lib/GrpHelper';

@Module({
  imports: [
    ClientsModule.register([
      buildClientModule(
        'AUTH_SERVICE',
        'auth.v1',
        'AUTH',
        'auth/v1/auth.proto',
      ),
    ]),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
