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
import { CreateRegionDto } from './dto/create-region.dto'
import { UpdateRegionDto } from './dto/update-region.dto'
import { Region } from './entities/region.entity'
import { RegionService } from './region.service'

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createRegionDto: CreateRegionDto): Promise<Region> {
    return await this.regionService.create(createRegionDto)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Region[]> {
    return await this.regionService.findAll()
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<Region> {
    return await this.regionService.findOne(id)
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateRegionDto: UpdateRegionDto
  ): Promise<UpdateResult> {
    return await this.regionService.update(id, updateRegionDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.regionService.remove(id)
  }
}
