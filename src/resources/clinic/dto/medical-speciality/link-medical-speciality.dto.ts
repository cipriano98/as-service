import { IsNotEmpty, IsString } from 'class-validator'

export class LinkMedicalSpeciality {
  @IsString()
  @IsNotEmpty()
  id: string
}
