import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import 'dotenv/config'
import { corsConfig } from './core/cors-config'
import { join } from 'node:path'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { environment } from './core/environment'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'msusers.user',
      protoPath: join(__dirname, '../proto/msusers.proto'),
      url: `0.0.0.0:${environment.grpcPort}`,
    },
  })
  app.enableCors(corsConfig)
  await app.listen(environment.graphqlPort)
  await app.startAllMicroservices()
  console.log(`Graphql: http://localhost:${environment.graphqlPort}/graphql`)
  console.log(`Grpc: grpc://localhost:${environment.grpcPort}`)
}
bootstrap()
