import { Request } from 'express'
import { User } from 'src/resources/user/entities/user.entity'

export interface AuthRequest extends Request {
  user: User
}
