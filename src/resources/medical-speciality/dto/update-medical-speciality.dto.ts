import { PartialType } from '@nestjs/mapped-types'
import { CreateMedicalSpecialityDto } from './create-medical-speciality.dto'

export class UpdateMedicalSpecialityDto extends PartialType(
  CreateMedicalSpecialityDto
) {}
