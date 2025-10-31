import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GrpcModule } from './grpc/grpc.module';

@Module({
  imports: [GrpcModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
