import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common'
import { PaginationOptionsDto } from 'src/shared/pagination/dto/pagination.dto'
import { IPagination } from 'src/shared/pagination/models/pagination.model'
import { DeleteResult } from 'typeorm'
import { ClinicService } from './clinic.service'
import { CreateClinicDto } from './dto/create-clinic.dto'
import { UpdateClinicDto } from './dto/update-clinic.dto'
import { Clinic } from './entities/clinic.entity'
import { IClinic, IClinicView } from './models/clinic.model'

@Controller('clinic')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createClinicDto: CreateClinicDto): Promise<Clinic> {
    return await this.clinicService.create(createClinicDto)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: PaginationOptionsDto<IClinicView>
  ): Promise<IPagination<IClinicView>> {
    return await this.clinicService.findAll(query)
  }

  @Get(':id/view')
  @HttpCode(HttpStatus.OK)
  async getView(@Param('id') id: string): Promise<IClinicView> {
    return await this.clinicService.getView(id)
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<IClinic> {
    return await this.clinicService.findOne(id)
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateClinicDto: UpdateClinicDto
  ): Promise<Clinic> {
    return await this.clinicService.update(id, updateClinicDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.clinicService.remove(id)
  }
}
