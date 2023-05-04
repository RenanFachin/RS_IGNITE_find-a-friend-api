import {
  Age,
  EnergyLevel,
  Pet,
  Size,
  Prisma,
  Organization,
} from '@prisma/client'

export interface SearchPetsProps {
  city: string
  age: Age | null
  energy_level: EnergyLevel | null
  size: Size | null
}

// Tipando os métodos
export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findManyByQuery(data: SearchPetsProps): Promise<Pet[]>
  findManyByOrgs(orgs: Organization[]): Promise<Pet[]>
}
