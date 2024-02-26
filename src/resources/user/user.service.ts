import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const password = await bcrypt.hash(createUserDto.password, 10)

    const user = this.repository.create({
      ...createUserDto,
      password
    })

    const userCreated = await this.repository.save(user)
    Reflect.deleteProperty(userCreated, 'password')

    return userCreated
  }

  findAll() {
    return `This action returns all user`
  }

  async findOne(id: string): Promise<User> {
    const user = await this.repository.findOneOrFail({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    return user
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOneByOrFail({ email })
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: string) {
    return `This action removes a #${id} user`
  }
}
