import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './Hexagonal/infrastructure/modules/app.module';
import { RABBITMQ } from './Hexagonal/infrastructure/adapters/input/messaging/config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow<string>('RABBITMQ_URL')],
      queue: configService.getOrThrow<string>('RABBITMQ_QUEUE'),
      noAck: false,
      queueOptions: {
        durable: true,
        arguments: {
          'x-dead-letter-exchange': '',
          'x-dead-letter-routing-key': RABBITMQ.DLQ,
        },
      },
    },
  });

  await app.startAllMicroservices();
  console.log(`RabbitMQ Microservice listening on queue: ${RABBITMQ. QUEUE}`);

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  console.log(`GraphQL Playground: http://localhost:${port}/graphql`);
}

bootstrap();