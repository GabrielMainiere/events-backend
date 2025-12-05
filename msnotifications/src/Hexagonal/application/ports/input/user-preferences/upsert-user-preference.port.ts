import { UpsertUserPreferenceCommand } from "src/Hexagonal/application/dtos/user-preferences/upsert-user-preference.command";

export interface IUpsertUserPreference {
  execute(command: UpsertUserPreferenceCommand): Promise<void>;
}