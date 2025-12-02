import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from './core/environment';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { EVENTS_REGISTRATION_QUEUE } from './core/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const graphqlPort = environment.graphqlPort;

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: ['eventregistration'],
      protoPath: join(__dirname, '../proto/event-registration.proto'),
      url: `0.0.0.0:${environment.grpcPort}`
    }
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: ['eventregistration.payments'],
      protoPath: join(__dirname, '../proto/event-registration-payment.proto'),
      url: `0.0.0.0:${environment.grpcPaymentsPort}`
    }
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [environment.rabbitMqUrl],
      queue: EVENTS_REGISTRATION_QUEUE,
      queueOptions: {
        durable: true
      }
    }
  });

  await app.startAllMicroservices();
  await app.listen(graphqlPort);
  console.log(`GraphQL running on http://localhost:${graphqlPort}`);
  console.log(`gRPC running on port ${environment.grpcPort}`);
}
bootstrap();
