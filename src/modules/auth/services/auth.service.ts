import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { User } from 'src/resources/user/entities/user.entity'
import { UserService } from 'src/resources/user/user.service'
import { ErrorException } from 'src/shared/utils/error.utils'
import { UserPayload } from '../models/UserPayload'
import { UserToken } from '../models/UserToken'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async login(user: User): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name
    }

    const access_token = this.jwtService.sign(payload, {
      secret: process.env.AUTH_SECRET
    })

    const userToken: UserToken = {
      id: user.id,
      name: user.name,
      email: user.email,
      access_token
    }

    return userToken
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email)

    const isPasswordValid = user
      ? await bcrypt.compare(password, user.password)
      : false

    if (isPasswordValid) {
      return user
    }

    const error = ErrorException(
      'Dados incorretos. Por Favor, revise seus dados e tente novamente.',
      HttpStatus.UNAUTHORIZED
    )

    throw new UnauthorizedException(error)
  }
}
