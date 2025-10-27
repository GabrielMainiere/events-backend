import { Provider } from '@nestjs/common'
import { PRISMA_CLIENT } from 'src/core/constants'
import { PrismaClientSingleton } from 'src/core/prisma-client'

export const prismaClient: Provider = {
  provide: PRISMA_CLIENT,
  useValue: PrismaClientSingleton.getInstance(),
}
