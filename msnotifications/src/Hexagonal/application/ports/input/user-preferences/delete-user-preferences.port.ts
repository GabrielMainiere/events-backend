import { DeleteUserPreferencesCommand } from "src/Hexagonal/application/dtos/user-preferences/delete-user-preferences.command";

export interface IDeleteUserPreferences {
  execute(command: DeleteUserPreferencesCommand): Promise<void>;
}
