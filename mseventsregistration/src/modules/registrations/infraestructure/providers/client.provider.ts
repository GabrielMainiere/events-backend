import { UsersClient } from 'src/modules/users/infraestructure/grpc/userClient'

export const USER_CLIENT_TOKEN = 'IUsersClient'
export const userClientProvider = {
  provide: USER_CLIENT_TOKEN,
  useExisting: UsersClient
}
