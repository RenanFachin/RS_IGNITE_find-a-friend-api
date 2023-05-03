import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pet-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const newPet = {
      id: randomUUID(),
      name: data.name,
      description: data.description ? data.description : null,
      age: data.age,
      energy_level: data.energy_level,
      size: data.size,
      organization_id: data.organization_id,
      created_at: new Date(),
    }

    this.items.push(newPet)

    return newPet
  }
}
