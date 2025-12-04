import { tb_registered_event } from '@prisma/client';
import { EventChangeInput } from '../dto/event-change.input';

export interface IEventsRepository {
  create(data: EventChangeInput): Promise<tb_registered_event>;
  update(data: EventChangeInput): Promise<tb_registered_event>;
  findById(id: string): Promise<tb_registered_event | null>;
}
