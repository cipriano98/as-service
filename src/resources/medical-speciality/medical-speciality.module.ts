import { Module, OnModuleInit } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MedicalSpeciality } from './entities/medical-speciality.entity'
import { MedicalSpecialityController } from './medical-speciality.controller'
import { MedicalSpecialityService } from './medical-speciality.service'
import { MedicalSpecialitySeed } from './seed/medical-speciality.seed'

@Module({
  imports: [TypeOrmModule.forFeature([MedicalSpeciality])],
  controllers: [MedicalSpecialityController],
  providers: [MedicalSpecialityService, MedicalSpecialitySeed]
})
export class MedicalSpecialityModule implements OnModuleInit {
  constructor(private readonly seed: MedicalSpecialitySeed) {}

  onModuleInit(): void {
    this.seed.run()
  }
}
