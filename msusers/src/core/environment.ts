import 'dotenv/config'

export const environment = {
  jwtPass: process.env.JWT_PASS || 'default_jwt_pass',
  saltRounds: parseInt(process.env.SALT_ROUNDS ?? '10', 10),
}
