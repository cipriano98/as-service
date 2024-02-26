import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MedicalSpeciality } from 'src/resources/medical-speciality/entities/medical-speciality.entity'
import { Repository } from 'typeorm'

@Injectable()
export class MedicalSpecialitySeed {
  constructor(
    @InjectRepository(MedicalSpeciality)
    private readonly repository: Repository<MedicalSpeciality>
  ) {}

  public async run(): Promise<void> {
    const count = await this.repository.count()

    if (!count) {
      const medicalSpecialityList = [
        'Acupuntura',
        'Alergia e Imunologia',
        'Anestesiologista',
        'Angiologia',
        'Cardiologia',
        'Cirurgia Cardiovascular',
        'Cirurgia da Mão',
        'Cirurgia de Cabeça e Pescoço',
        'Cirurgia do Aparelho Digestivo',
        'Cirurgia Geral',
        'Cirurgia Oncológica',
        'Cirurgia Pediátrica',
        'Cirurgia Plástica',
        'Cirurgia Torácica',
        'Cirurgia Vascular',
        'Clínica Médica',
        'Coloproctologia',
        'Dermatologia',
        'Endocrinologia e Metabologia',
        'Endoscopia',
        'Gastroenterologia',
        'Genética Médica',
        'Geriatria',
        'Ginecologia e Obstetrícia',
        'Hematologia e Hemoterapia',
        'Homeopatia',
        'Infectologia',
        'Mastologia',
        'Medicina de Emergência',
        'Medicina de Família e Comunidade',
        'Medicina do Trabalho',
        'Medicina de Tráfego',
        'Medicina Esportiva',
        'Medicina Física e Reabilitação',
        'Medicina Intensiva',
        'Medicina Legal e Perícia Médica',
        'Medicina Nuclear',
        'Medicina Preventiva e Social',
        'Nefrologia',
        'Neurocirurgia',
        'Neurologia',
        'Nutrologia',
        'Oftalmologia',
        'Oncologia Clínica',
        'Ortopedia e Traumatologia',
        'Otorrinolaringologia',
        'Patologia',
        'Patologia Clínica/Medicina Laboratorial',
        'Pediatria',
        'Psiquiatria',
        'Pneumologia',
        'Radiologia e Diagnóstico por Imagem',
        'Radioterapia',
        'Reumatologia',
        'Urologia'
      ]

      const medicalSpeciality = medicalSpecialityList.map(region => {
        return this.repository.create({
          name: region
        })
      })

      await this.repository.save(medicalSpeciality)
    }
  }
}
