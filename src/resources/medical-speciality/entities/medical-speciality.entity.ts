import { Clinic } from 'src/resources/clinic/entities/clinic.entity'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class MedicalSpeciality {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @ManyToMany((): typeof Clinic => Clinic, clinic => clinic.medicalSpecialities)
  @JoinTable({
    name: 'clinic_medical_speciality',
    joinColumn: { name: 'medicalSpecialityId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'clinicId', referencedColumnName: 'id' }
  })
  clinic: Clinic[]
}
