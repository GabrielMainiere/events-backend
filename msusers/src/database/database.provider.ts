import { Provider } from '@nestjs/common'
import { PrismaClientSingleton } from 'src/core/prisma-client'

export const prismaClient: Provider = {
  provide: 'PrismaClient',
  useValue: PrismaClientSingleton.getInstance(),
}
