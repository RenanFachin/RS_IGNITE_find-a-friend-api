import { Pet, Prisma } from '@prisma/client'

// Tipando os métodos
export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
}
