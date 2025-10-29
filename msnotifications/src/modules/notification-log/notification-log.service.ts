import { Injectable } from '@nestjs/common';
import { CreateNotificationLogDto } from 'src/dto/createNotificationLogDto';
import { NotificationLogRepository } from './notification-log.repository';

@Injectable()
export class NotificationLogService {
  constructor(
    private readonly repository: NotificationLogRepository,
  ) {}

  async create(data: CreateNotificationLogDto) {
    return this.repository.create(data);
  }
}