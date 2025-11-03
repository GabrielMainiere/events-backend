import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { environment } from 'src/core/environment';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'eventregistration', 
  protoPath: join(__dirname, '../../proto/event-registration.proto'),
    url: `${environment.grpcMseventsregistrations}`, 
  },
};
