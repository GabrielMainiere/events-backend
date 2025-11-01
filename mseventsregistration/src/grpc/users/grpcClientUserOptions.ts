import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientUserOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'msusers.user',
    protoPath: join(__dirname, './proto/msusers.proto'),
    url: 'localhost:50052',
  },
};
