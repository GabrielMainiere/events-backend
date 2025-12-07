import { registerEnumType } from '@nestjs/graphql'
import { EventStatus, EventType } from '@prisma/client'

registerEnumType(EventStatus, { name: 'EventStatus' })

registerEnumType(EventType, { name: 'EventType' })
