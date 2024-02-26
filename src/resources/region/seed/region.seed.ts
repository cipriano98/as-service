import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Region } from '../entities/region.entity'

@Injectable()
export class RegionSeed {
  constructor(
    @InjectRepository(Region)
    private readonly repository: Repository<Region>
  ) {}

  public async run(): Promise<void> {
    const count = await this.repository.count()

    if (!count) {
      const regionList = [
        'Alto tietê',
        'Interior',
        'ES',
        'SP Interior',
        'SP',
        'SP2',
        'MG',
        'Nacional',
        'SP CAV',
        'RJ',
        'SP2',
        'SP1',
        'NE1',
        'NE2',
        'SUL',
        'Norte'
      ]

      const regions = regionList.map(region => {
        return this.repository.create({
          name: region
        })
      })

      await this.repository.save(regions)
    }
  }
}
