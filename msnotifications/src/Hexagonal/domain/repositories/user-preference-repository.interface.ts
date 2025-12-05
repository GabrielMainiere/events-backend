import { UserPreference } from "../models/user-preference.model";

export interface IUserPreferenceRepository {

  save(preference: UserPreference): Promise<void>;
  findById(id: string): Promise<UserPreference | null>;
  findByUserAndTypeAndChannel(
    userId: string,
    notificationType: string,
    channel: string,
  ): Promise<UserPreference | null>;
  findByUserId(userId: string): Promise<UserPreference[]>;
  findAll(): Promise<UserPreference[]>;
  delete(id: string): Promise<void>;
}