import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class LoginRequestBody {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}
