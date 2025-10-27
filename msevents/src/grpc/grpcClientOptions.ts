import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'eventregistration', 
  protoPath: join(__dirname, '../../proto/event-registration.proto'),
    url: 'localhost:50051', 
  },
};
