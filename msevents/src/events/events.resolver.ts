import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { EventsService } from './services/events.service';
import { Event } from './entities/event.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event-input';
import { CancelEventInput } from './dto/cancel-event.input';

@Resolver(() => Event)
export class EventsResolver {
  constructor(private readonly service: EventsService) {}

  @Mutation(() => Event)
  async createEvent(
    @Args('input') input: CreateEventInput,): Promise<Event> {
    return this.service.createEvent(input);
  }

  @Mutation(() => Event)
  async updateEvent(@Args('input') input: UpdateEventInput): Promise<Event> {
    return this.service.updateEvent(input);
  }

  @Mutation(() => Event)
  async cancelEvent(@Args('input') input: CancelEventInput): Promise<Event | undefined> {
    return this.service.cancelEvent(input.id);
  }

  @Query(() => Event)
  async getEventById(@Args('id') id: string): Promise<Event> {
    return this.service.getEventById(id);
  }

  @Query(() => [Event])
  async events(): Promise<Event[]> {
    return this.service.getAllEvents();
  }
}

