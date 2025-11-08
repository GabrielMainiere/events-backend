import { Transform } from 'class-transformer'
import { IsEmail, IsISO8601, IsPhoneNumber, IsStrongPassword } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  email: string

  name: string

  @IsISO8601()
  @Transform(({ value }) => new Date(value).toISOString())
  birthDatetime: string

  cpf: string

  @IsPhoneNumber()
  phoneNumber: string

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password is not strong enough, it should have at least 8 characters, including uppercase, lowercase, number and special character.',
    }
  )
  password: string
}
