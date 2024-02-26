import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common'
import { IsPublic } from './decorators/is-public.decorator'
import { LocalAuthGuard } from './guards/local/local-auth.guard'
import { AuthRequest } from './models/AuthRequest'
import { UserToken } from './models/UserToken'
import { AuthService } from './services/auth.service'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: AuthRequest): Promise<UserToken> {
    return this.authService.login(req.user)
  }
}
