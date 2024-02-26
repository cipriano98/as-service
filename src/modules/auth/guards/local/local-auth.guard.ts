import {
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'
import { ErrorException } from 'src/shared/utils/error.utils'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context)
  }

  handleRequest(err, user) {
    if (err || !user) {
      const error = ErrorException(
        'Dados incorretos. Por Favor, revise seus dados e tente novamente.',
        HttpStatus.UNAUTHORIZED
      )
      throw new UnauthorizedException(error)
    }

    return user
  }
}
