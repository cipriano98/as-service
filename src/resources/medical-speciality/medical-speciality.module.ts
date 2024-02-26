import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MedicalSpeciality } from './entities/medical-speciality.entity'
import { MedicalSpecialityController } from './medical-speciality.controller'
import { MedicalSpecialityService } from './medical-speciality.service'

@Module({
  imports: [TypeOrmModule.forFeature([MedicalSpeciality])],
  controllers: [MedicalSpecialityController],
  providers: [MedicalSpecialityService]
})
export class MedicalSpecialityModule {}
