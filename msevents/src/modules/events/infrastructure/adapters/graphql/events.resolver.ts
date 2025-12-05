import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Event } from '../../../domain/entities/event.entity';
import { CreateEventInput } from '../../../application/dto/create-event.input';
import { UpdateEventInput } from '../../../application/dto/update-event-input';
import { CancelEventInput } from '../../../application/dto/cancel-event.input';
//import { RolesEnum } from 'src/core/enum/roles';
import { isPublic } from 'src/auth/auth.decorators';
import { CancelEventUseCase } from 'src/modules/events/application/use-cases/cancel-event.usecase';
import { CreateEventUseCase } from 'src/modules/events/application/use-cases/create-event.usecase';
import { UpdateEventUseCase } from 'src/modules/events/application/use-cases/update-event.usecase';
import { FindAllEventsUseCase } from 'src/modules/events/application/use-cases/findAll-event.usecase';
import { GetEventUseCase } from 'src/modules/events/application/use-cases/get-event-by-id.usecase';

@Resolver(() => Event)
export class EventsResolver {
  constructor(
    private readonly cancelUC: CancelEventUseCase,
    private readonly createUC: CreateEventUseCase,
    private readonly updateUC: UpdateEventUseCase,
    private readonly findAllUC: FindAllEventsUseCase,
    private readonly getByIdUC: GetEventUseCase,
  ) {}

  @Mutation(() => Event)
  //@RequiredRole(RolesEnum.Admin)
  async createEvent(@Args('input') input: CreateEventInput): Promise<Event> {
    return this.createUC.createEvent(input);
  }

  @Mutation(() => Event)
  //@RequiredRole(RolesEnum.Admin)
  async updateEvent(@Args('input') input: UpdateEventInput): Promise<Event> {
    return this.updateUC.updateEvent(input);
  }

  @Mutation(() => Event)
  //@RequiredRole(RolesEnum.Admin)
  async cancelEvent(
    @Args('input') input: CancelEventInput
  ): Promise<Event | undefined> {
    return this.cancelUC.cancelEvent(input.id);
  }

  @Query(() => Event)
  @isPublic()
  async getEventById(@Args('id') id: string): Promise<Event> {
    return this.getByIdUC.getById(id);
  }

  @Query(() => [Event])
  @isPublic()
  async events(): Promise<Event[]> {
    return this.findAllUC.getAllEvents();
  }
}


