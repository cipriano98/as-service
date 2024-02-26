import { MedicalSpeciality } from 'src/resources/medical-speciality/entities/medical-speciality.entity'
import { Region } from 'src/resources/region/entities/region.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export class Clinic {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string

  @Column({ type: 'text' })
  corporateName: string

  @Column({ type: 'text' })
  tradeName: string

  @Column({ type: 'text' })
  cnpj: string

  @Column({ type: 'text' })
  openingDate: string

  @Column({ default: false })
  active: boolean

  @ManyToOne((): typeof Region => Region, region => region.clinics)
  @JoinColumn({ name: 'regionId' })
  region: Region

  @ManyToMany((): typeof MedicalSpeciality => MedicalSpeciality)
  @JoinTable({
    name: 'clinic_medical_speciality',
    joinColumn: { name: 'clinicId', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'medicalSpecialityId',
      referencedColumnName: 'id'
    }
  })
  medicalSpecialities: MedicalSpeciality[]
}
