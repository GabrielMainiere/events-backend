import 'dotenv/config';

export const environment = {
  databaseUrl: process.env.DATABASE_URL || 'postgresql://user:pass@localhost:5432/dbname',
  graphqlPort: Number(process.env.GRAPHQL_PORT ?? '3001'),
  grpcPort: Number(process.env.GRPC_PORT ?? '50051'),
  grpcPortMsusers: Number(process.env.GRPC_PORT_MSUSERS ?? '50053'),
  grpcPaymentsPort: Number(process.env.GRPC_PORT_MSPAYMENT ?? '50054'),
};
