import { Type } from 'class-transformer'
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsString,
  ValidateNested
} from 'class-validator'
import { MedicalSpeciality } from 'src/resources/medical-speciality/entities/medical-speciality.entity'
import { Region } from 'src/resources/region/entities/region.entity'
import { LinkMedicalSpeciality } from './medical-speciality/link-medical-speciality.dto'

export class CreateClinicDto {
  @IsString()
  @IsNotEmpty()
  corporateName: string

  @IsString()
  @IsNotEmpty()
  tradeName: string

  @IsBoolean()
  @IsNotEmpty()
  active: boolean

  @IsString()
  @IsNotEmpty()
  cnpj: string

  @IsDateString()
  @IsNotEmpty()
  openingDate: string

  @IsString()
  @IsNotEmpty()
  region: Region

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => LinkMedicalSpeciality)
  medicalSpecialities: MedicalSpeciality[]
}
