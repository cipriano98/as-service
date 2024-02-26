import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { User } from '../entities/user.entity'

export class CreateUserDto extends User {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  password: string
}
