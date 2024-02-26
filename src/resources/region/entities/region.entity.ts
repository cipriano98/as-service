import { Clinic } from 'src/resources/clinic/entities/clinic.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Region {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @OneToMany((): typeof Clinic => Clinic, clinic => clinic.region)
  clinics: Clinic[]
}
