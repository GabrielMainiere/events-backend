import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from './core/environment';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const graphqlPort = environment.graphqlPort;

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'eventregistration',
      protoPath: join(__dirname, '../proto/event-registration.proto'),
      url: `0.0.0.0:${environment.grpcPort}`,
    },
  });

  await app.startAllMicroservices();
  await app.listen(graphqlPort);
  console.log(`GraphQL running on http://localhost:${graphqlPort}`);
  console.log(`gRPC running on port ${environment.grpcPort}`);
}
bootstrap();
