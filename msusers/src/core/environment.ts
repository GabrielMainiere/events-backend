import 'dotenv/config'

export const environment = {
  jwtPass: process.env.JWT_PASS || 'default_jwt_pass',
  saltRounds: Number(process.env.SALT_ROUNDS ?? '10'),
  graphqlPort: Number(process.env.GRAPHQL_PORT ?? '3000'),
  grpcPort: Number(process.env.GRPC_PORT ?? '5000'),
  notificationsGrpcUrl: process.env.NOTIFICATIONS_GRPC_URL || 'localhost:50051',
}
