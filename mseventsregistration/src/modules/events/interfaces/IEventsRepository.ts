import { tb_registered_event } from '@prisma/client';
import { EventChangeInput } from '../dto/event-change.input';

export abstract class IEventsRepository {
  abstract create(data: EventChangeInput): Promise<tb_registered_event>;
  abstract update(data: EventChangeInput): Promise<tb_registered_event>;
  abstract findById(id: string): Promise<tb_registered_event | null>;
}
