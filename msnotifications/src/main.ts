import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { RABBITMQ } from './rabbitMQ/config/rabbitMQ.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

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
          'x-dead-letter-routing-key': RABBITMQ.DLQ
        },
      },
    },
  });
  
  await app.startAllMicroservices();
  await app.listen(3000);
  
  console.log('ms-notifications (RabbitMQ) is listening on the configured queue');
  console.log('ms-notifications (HTTP) is listening on port 3000');
}
bootstrap();