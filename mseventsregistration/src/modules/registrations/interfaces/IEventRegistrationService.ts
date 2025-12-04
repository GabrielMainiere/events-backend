import { IGetRegistrationRequest } from './IGetRegistrationRequest';
import { IGetRegistrationResponse } from './IGetRegistrationResponse';

export interface IEventRegistrationService {
  countEventRegistrations(data: {
    eventId: string;
  }): Promise<{ count: number }>;
  getRegistration(
    data: IGetRegistrationRequest
  ): Promise<IGetRegistrationResponse>;
}
