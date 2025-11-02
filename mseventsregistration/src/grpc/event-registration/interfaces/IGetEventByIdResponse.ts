export interface IGetEventByIdResponse {
  id: string;
  title: string;
  description?: string;
  startAt: string;
  endAt: string;
  price?: number;
  saleStartAt?: string;
  saleEndAt?: string;
  addressStreet: string;
  addressNumber?: string;
  addressCity: string;
  addressState: string;
  addressZipcode: string;
  addressCountry: string;
  capacity: number;
  isFree: boolean;
  eventType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  hasVacancy: boolean;
}