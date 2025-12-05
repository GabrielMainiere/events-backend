import { IsUUID, IsNotEmpty } from 'class-validator';

export class DeleteUserPreferencesCommand {
  
  @IsUUID(4, { message: 'User ID must be a valid UUID v4' })
  @IsNotEmpty({ message: 'User ID is required' })
  userId: string;
}