import { Controller, Inject } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'
import { EVENT_CHANGE_PATTERN } from 'src/core/constants'
import { EventMessageRequest } from '../application/dto/event-message.request'
import { HandleEventChangeUseCase } from '../application/usecases/handle-event-change.usecase'
import { plainToInstance } from 'class-transformer'

@Controller()
export class EventsController {
  constructor(
    @Inject()
    private readonly handleEventChangeUseCase: HandleEventChangeUseCase
  ) {}

  @EventPattern(EVENT_CHANGE_PATTERN)
  async handleEventChange(@Payload() data: EventMessageRequest) {
    const message = plainToInstance(EventMessageRequest, data)

    await this.handleEventChangeUseCase.execute(message.event, message.action)
  }
}
