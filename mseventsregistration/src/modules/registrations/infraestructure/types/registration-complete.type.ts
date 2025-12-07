import { Prisma } from '@prisma/client'

export type PrismaRegistrationWithRelations =
  Prisma.EventsRegistrationGetPayload<{
    include: {
      user: true
      event: true
    }
  }>
