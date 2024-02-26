import {
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { ErrorException } from 'src/shared/utils/error.utils'
import { IS_PUBLIC_KEY } from '../../decorators/is-public.decorator'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (isPublic) {
      return true
    }

    const canActivate = super.canActivate(context)

    if (typeof canActivate === 'boolean') {
      return canActivate
    }

    const canActivatePromise = canActivate as Promise<boolean>

    return canActivatePromise.catch(err => {
      const error = ErrorException(
        'Acesso negado. Faça login no sistema novamente',
        HttpStatus.UNAUTHORIZED
      )

      if (err instanceof Error) {
        throw new UnauthorizedException(error)
      }

      throw new UnauthorizedException(error)
    })
  }
}
