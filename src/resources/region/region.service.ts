import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { CreateRegionDto } from './dto/create-region.dto'
import { UpdateRegionDto } from './dto/update-region.dto'
import { Region } from './entities/region.entity'

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(Region)
    private readonly repository: Repository<Region>
  ) {}

  async create(createRegionDto: CreateRegionDto): Promise<Region> {
    const region = this.repository.create(createRegionDto)
    return await this.repository.save(region)
  }

  async findAll(): Promise<Region[]> {
    return await this.repository.find()
  }

  async findOne(id: string): Promise<Region> {
    return await this.repository.findOneOrFail({
      where: { id }
    })
  }

  async update(
    id: string,
    updateRegionDto: UpdateRegionDto
  ): Promise<UpdateResult> {
    return await this.repository.update({ id }, updateRegionDto)
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.repository.delete({ id })
  }
}
