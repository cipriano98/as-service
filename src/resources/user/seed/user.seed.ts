import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../entities/user.entity'

@Injectable()
export class UserSeed {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {}

  public async run(): Promise<void> {
    const count = await this.repository.count()

    if (!count) {
      const user: User = this.repository.create({
        email: 'admin@amorsaude.com',
        name: 'Admin',
        password: 'admin'
      })

      await this.repository.save(user)
    }
  }
}
