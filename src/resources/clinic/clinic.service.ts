import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PaginationOptionsDto } from 'src/shared/pagination/dto/pagination.dto'
import { IPagination } from 'src/shared/pagination/models/pagination.model'
import { ErrorException } from 'src/shared/utils/error.utils'
import {
  DeleteResult,
  EntityManager,
  FindOptionsWhere,
  ILike,
  InsertResult,
  Repository
} from 'typeorm'
import { MedicalSpeciality } from '../medical-speciality/entities/medical-speciality.entity'
import { CreateClinicDto } from './dto/create-clinic.dto'
import { UpdateClinicDto } from './dto/update-clinic.dto'
import { Clinic } from './entities/clinic.entity'
import { IClinic, IClinicView } from './models/clinic.model'

@Injectable()
export class ClinicService {
  constructor(
    @InjectRepository(Clinic)
    private readonly repository: Repository<Clinic>,
    private readonly entityManager: EntityManager
  ) {}

  async create(createClinicDto: CreateClinicDto): Promise<Clinic> {
    const clinic = this.repository.create(createClinicDto)

    const { medicalSpecialities } = clinic

    Reflect.deleteProperty(clinic, 'medicalSpecialities')
    const createdClinic = await this.repository.save(clinic)

    await this.createMedicalSpecialities(medicalSpecialities, createdClinic.id)

    return createdClinic
  }

  async findAll(
    query: PaginationOptionsDto<IClinicView>
  ): Promise<IPagination<IClinicView>> {
    const { search, page, pageSize, sort, direction } = query

    const operatorSearch = ILike(`%${search}%`)

    const where: FindOptionsWhere<Clinic>[] | undefined =
      search?.length >= 3
        ? [
            { corporateName: operatorSearch },
            { region: { name: operatorSearch } },
            { medicalSpecialities: { name: operatorSearch } }
          ]
        : undefined

    const activeSearch = ['sim', 'não'].includes(search?.toLocaleLowerCase())

    activeSearch && where.push({ active: search.toLocaleLowerCase() === 'sim' })

    try {
      const [clinics, count] = await this.repository.findAndCount({
        relations: ['region', 'medicalSpecialities'],
        select: {
          active: true,
          corporateName: true,
          id: true,
          tradeName: true,
          openingDate: true,
          cnpj: true,
          region: { name: true },
          medicalSpecialities: true
        },
        order: {
          [sort]: sort === 'region' ? { name: direction } : direction
        },
        where,
        skip: page * pageSize,
        take: pageSize
      })

      const clinicView: IClinicView[] = clinics.map(clinic => {
        return {
          ...clinic,
          active: clinic.active ? 'Sim' : 'Não',
          region: clinic.region.name,
          medicalSpecialities: clinic.medicalSpecialities.map(
            medicalSpeciality => medicalSpeciality.name
          )
        }
      })

      return { data: clinicView, page, pageSize, totalItems: count }
    } catch (err) {
      console.error(err)

      const error = ErrorException(
        `Erro ao buscar itens paginados`,
        HttpStatus.BAD_REQUEST
      )

      throw new BadRequestException(error)
    }
  }

  async getView(id: string): Promise<IClinicView> {
    try {
      const clinic = await this.repository.findOne({
        where: { id: id },
        relations: ['region', 'medicalSpecialities'],
        select: {
          active: true,
          corporateName: true,
          id: true,
          tradeName: true,
          openingDate: true,
          cnpj: true,
          region: {
            name: true
          },
          medicalSpecialities: true
        }
      })

      return {
        ...clinic,
        active: clinic.active ? 'Sim' : 'Não',
        region: clinic.region.name,
        medicalSpecialities: clinic.medicalSpecialities.map(
          medicalSpeciality => medicalSpeciality.name
        )
      }
    } catch (err) {
      console.error(err)

      const error = ErrorException(
        `Nenhum registro encontrado`,
        HttpStatus.NOT_FOUND
      )

      throw new NotFoundException(error)
    }
  }

  async findOne(id: string): Promise<IClinic> {
    try {
      const clinic = await this.repository.findOneOrFail({
        where: { id },
        relations: ['region', 'medicalSpecialities']
      })

      const clinicView: IClinic = {
        ...clinic,
        region: clinic.region.id,
        medicalSpecialities: clinic.medicalSpecialities.map(
          medicalSpeciality => medicalSpeciality.id
        )
      }

      return clinicView
    } catch (err) {
      console.error(err)

      const error = ErrorException(
        `Nenhum registro encontrado`,
        HttpStatus.NOT_FOUND
      )

      throw new NotFoundException(error)
    }
  }

  async update(id: string, updateClinicDto: UpdateClinicDto): Promise<Clinic> {
    const clinic = this.repository.create({ id, ...updateClinicDto })

    await this.deleteMedicalSpecialities(id)
    await this.createMedicalSpecialities(clinic.medicalSpecialities, id)

    Reflect.deleteProperty(clinic, 'medicalSpecialities')
    try {
      return await this.repository.save(clinic)
    } catch (err) {
      console.error(err)

      const error = ErrorException(
        `Erro ao atualizar uma clínica`,
        HttpStatus.BAD_REQUEST
      )

      throw new BadRequestException(error)
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      return await this.repository.delete({ id })
    } catch (err) {
      console.error(err)

      const error = ErrorException(
        `Ocorreu um erro inesperado ao remover uma clínica`,
        HttpStatus.INTERNAL_SERVER_ERROR
      )

      throw new InternalServerErrorException(error)
    }
  }

  private async createMedicalSpecialities(
    medicalSpecialities: MedicalSpeciality[],
    clinicId: string
  ): Promise<InsertResult> {
    const values = medicalSpecialities.map(speciality => {
      return {
        medicalSpecialityId: speciality.id,
        clinicId
      }
    })

    try {
      return await this.entityManager
        .createQueryBuilder()
        .insert()
        .into('clinic_medical_speciality')
        .values(values)
        .execute()
    } catch (err) {
      console.error(err)

      const error = ErrorException(
        `Ocorreu um erro inesperado ao adicionar uma especialidade`,
        HttpStatus.INTERNAL_SERVER_ERROR
      )

      throw new InternalServerErrorException(error)
    }
  }

  private async deleteMedicalSpecialities(
    clinicId: string
  ): Promise<DeleteResult> {
    try {
      return await this.entityManager
        .createQueryBuilder()
        .delete()
        .from('clinic_medical_speciality')
        .where({ clinicId })
        .execute()
    } catch (err) {
      console.error(err)

      const error = ErrorException(
        `Ocorreu um erro inesperado ao remover uma especialidade`,
        HttpStatus.INTERNAL_SERVER_ERROR
      )

      throw new InternalServerErrorException(error)
    }
  }
}
