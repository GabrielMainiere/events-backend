import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { environment } from 'src/core/environment';

export const grpcClientUserOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'msusers.user',
    protoPath: join(__dirname, '../../../proto/msusers.proto'),
    url: `${environment.grpcUsers}`,
  },
};
