import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import 'dotenv/config'
import { corsConfig } from './core/cors-config'
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors(corsConfig)
  await app.listen(process.env.PORT ?? 3000)
  console.log(`http://localhost:${process.env.PORT ?? 3000}/graphql`)
}
bootstrap()
