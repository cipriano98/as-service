import { Module, OnModuleInit } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { UserSeed } from './seed/user.seed'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserSeed]
})
export class UserModule implements OnModuleInit {
  constructor(private readonly seed: UserSeed) {}

  onModuleInit(): void {
    this.seed.run()
  }
}
