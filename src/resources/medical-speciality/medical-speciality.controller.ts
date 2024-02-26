import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post
} from '@nestjs/common'
import { DeleteResult, UpdateResult } from 'typeorm'
import { CreateMedicalSpecialityDto } from './dto/create-medical-speciality.dto'
import { UpdateMedicalSpecialityDto } from './dto/update-medical-speciality.dto'
import { MedicalSpeciality } from './entities/medical-speciality.entity'
import { MedicalSpecialityService } from './medical-speciality.service'

@Controller('medical-speciality')
export class MedicalSpecialityController {
  constructor(
    private readonly medicalSpecialityService: MedicalSpecialityService
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createMedicalSpecialityDto: CreateMedicalSpecialityDto
  ): Promise<MedicalSpeciality> {
    return await this.medicalSpecialityService.create(
      createMedicalSpecialityDto
    )
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<MedicalSpeciality[]> {
    return await this.medicalSpecialityService.findAll()
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<MedicalSpeciality> {
    return await this.medicalSpecialityService.findOne(id)
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateMedicalSpecialityDto: UpdateMedicalSpecialityDto
  ): Promise<UpdateResult> {
    return await this.medicalSpecialityService.update(
      id,
      updateMedicalSpecialityDto
    )
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.medicalSpecialityService.remove(id)
  }
}
