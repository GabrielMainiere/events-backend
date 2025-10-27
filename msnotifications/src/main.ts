import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.GRPC,
      options: {
        package: 'notifications',
        protoPath: join(__dirname, '../../proto/notifications.proto'),
        url: '0.0.0.0:50051',
      },
    },
  );
  
  await app.startAllMicroservices();
  await app.listen(3000);
  
  console.log('ms-notifications (gRPC) is listening on port 50051');
  console.log('ms-notifications (HTTP) is listening on port 3000');
}
bootstrap();