import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/resources/user/entities/user.entity'
import { UserService } from 'src/resources/user/user.service'
import { AuthController } from './auth.controller'
import { LoginValidationMiddleware } from './middlewares/login-validation.middleware'
import { AuthService } from './services/auth.service'
import { JwtStrategy } from './strategies/jwt/jwt.strategy'
import { LocalStrategy } from './strategies/local/local.strategy'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: process.env.AUTH_SECRET,
      signOptions: { expiresIn: '30d' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, UserService]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoginValidationMiddleware).forRoutes('login')
  }
}
