import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { EventsService } from './services/events.service';
import { Event } from './entities/event.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event-input';
import { CancelEventInput } from './dto/cancel-event.input';
import { RolesEnum } from 'src/enum/roles';
import { isPublic, RequiredRole } from 'src/auth/auth.decorators';

@Resolver(() => Event)
export class EventsResolver {
  constructor(private readonly service: EventsService) {}

  @Mutation(() => Event)
  @RequiredRole(RolesEnum.Admin)
  async createEvent(@Args('input') input: CreateEventInput): Promise<Event> {
    return this.service.createEvent(input);
  }

  @Mutation(() => Event)
  @RequiredRole(RolesEnum.Admin)
  async updateEvent(@Args('input') input: UpdateEventInput): Promise<Event> {
    return this.service.updateEvent(input);
  }

  @Mutation(() => Event)
  @RequiredRole(RolesEnum.Admin)
  async cancelEvent(
    @Args('input') input: CancelEventInput
  ): Promise<Event | undefined> {
    return this.service.cancelEvent(input.id);
  }

  @Query(() => Event)
  @isPublic()
  async getEventById(@Args('id') id: string): Promise<Event> {
    return this.service.getEventById(id);
  }

  @Query(() => [Event])
  @isPublic()
  async events(): Promise<Event[]> {
    return this.service.getAllEvents();
  }
}
