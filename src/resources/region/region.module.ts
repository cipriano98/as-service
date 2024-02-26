import { Module, OnModuleInit } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Region } from './entities/region.entity'
import { RegionController } from './region.controller'
import { RegionService } from './region.service'
import { RegionSeed } from './seed/region.seed'

@Module({
  imports: [TypeOrmModule.forFeature([Region])],
  controllers: [RegionController],
  providers: [RegionService, RegionSeed]
})
export class RegionModule implements OnModuleInit {
  constructor(private readonly seed: RegionSeed) {}

  onModuleInit(): void {
    this.seed.run()
  }
}
