export interface IEventRegistrationCount {
  countEventRegistrations(data: { eventId: string }): Promise<{ count: number }>;
}