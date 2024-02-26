export interface IClinic {
  id: string
  corporateName: string
  tradeName: string
  cnpj: string
  openingDate: string
  active: boolean
  region: string
  medicalSpecialities: string[]
}

export interface IClinicView {
  id: string
  corporateName: string
  tradeName: string
  openingDate: string
  cnpj: string
  region: string
  medicalSpecialities: string[]
  active: string
}
