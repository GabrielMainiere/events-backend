import { UpsertUserPreferenceCommand } from "src/Hexagonal/application/dtos/user-preferences/upsert-user-preference.command";
import { UserPreferenceResponse } from "src/Hexagonal/application/dtos/user-preferences/user-preference.response";

export interface IUpsertUserPreference {
  execute(command: UpsertUserPreferenceCommand): Promise<UserPreferenceResponse>;
}