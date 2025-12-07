import { UserPreferenceResponse } from "src/Hexagonal/application/dtos/user-preferences/user-preference.response";

export interface IGetUserPreferences {
  execute(userId: string): Promise<UserPreferenceResponse[]>;
}