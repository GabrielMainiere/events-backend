import 'dotenv/config';

export const environment = {
  databaseUrl: process.env.DATABASE_URL || 'postgresql://user:pass@localhost:5432/dbname',
  graphqlPort: Number(process.env.GRAPHQL_PORT ?? '3001'),
  grpcPort: Number(process.env.GRPC_PORT ?? '50051'),
  grpcUsers: process.env.GRPC_USERS || 'http://localhost:50051',
  grpcPaymentsPort: Number(process.env.GRPC_PORT_MSPAYMENT ?? '50054'),
  notificationsGrpcUrl: process.env.NOTIFICATIONS_GRPC_URL || 'localhost:50053',
};
