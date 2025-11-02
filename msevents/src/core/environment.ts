import 'dotenv/config';

export const environment = {
  databaseUrl: process.env.DATABASE_URL || 'postgresql://user:pass@localhost:5432/dbname',
  graphqlPort: Number(process.env.GRAPHQL_PORT ?? '3000'),
  grpcPortMseventsregistrations: Number(process.env.GRPC_PORT_MSEVENTSREGISTRATION ?? '50051'),
};
