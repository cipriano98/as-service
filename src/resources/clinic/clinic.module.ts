import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MedicalSpeciality } from '../medical-speciality/entities/medical-speciality.entity'
import { ClinicController } from './clinic.controller'
import { ClinicService } from './clinic.service'
import { Clinic } from './entities/clinic.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Clinic, MedicalSpeciality])],
  controllers: [ClinicController],
  providers: [ClinicService]
})
export class ClinicModule {}
