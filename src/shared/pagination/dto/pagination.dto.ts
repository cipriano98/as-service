import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min
} from 'class-validator'

export class PaginationOptionsDto<Entity> {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  page: number

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(100)
  pageSize: number

  @IsString()
  @IsOptional()
  search?: string

  @IsString()
  @IsOptional()
  sort?: keyof Entity

  @IsString()
  @IsOptional()
  direction?: 'asc' | 'desc'
}
