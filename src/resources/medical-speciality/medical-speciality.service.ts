import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { CreateMedicalSpecialityDto } from './dto/create-medical-speciality.dto'
import { UpdateMedicalSpecialityDto } from './dto/update-medical-speciality.dto'
import { MedicalSpeciality } from './entities/medical-speciality.entity'

@Injectable()
export class MedicalSpecialityService {
  constructor(
    @InjectRepository(MedicalSpeciality)
    private readonly repository: Repository<MedicalSpeciality>
  ) {}

  async create(
    createMedicalSpecialityDto: CreateMedicalSpecialityDto
  ): Promise<MedicalSpeciality> {
    const medicalSpeciality = this.repository.create(createMedicalSpecialityDto)
    return await this.repository.save(medicalSpeciality)
  }

  async findAll(): Promise<MedicalSpeciality[]> {
    const medicalSpeciality = await this.repository.find()

    return medicalSpeciality
  }

  async findOne(id: string): Promise<MedicalSpeciality> {
    return await this.repository.findOneOrFail({
      where: { id }
    })
  }

  async update(
    id: string,
    updateMedicalSpecialityDto: UpdateMedicalSpecialityDto
  ): Promise<UpdateResult> {
    return await this.repository.update({ id }, updateMedicalSpecialityDto)
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.repository.delete({ id })
  }
}
