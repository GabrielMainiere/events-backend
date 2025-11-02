import 'dotenv/config';

export const environment = {
  databaseUrl: process.env.DATABASE_URL || 'postgresql://user:pass@localhost:5432/dbname',
  graphqlPort: Number(process.env.GRAPHQL_PORT ?? '3000'),
  grpcMseventsregistrations: process.env.GRPC_MSEVENTSREGISTRATION ?? 'http://localhost:50051',
};
