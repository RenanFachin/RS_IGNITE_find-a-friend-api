import { Pet, Prisma } from '@prisma/client'
import { PetsRepository, SearchPetsProps } from '../pet-repository'
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

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findManyByQuery({ age, energy_level, size }: SearchPetsProps) {
    let petsFiltered = this.items

    if (energy_level) {
      petsFiltered = this.items.filter(
        (item) => item.energy_level === energy_level,
      )
    }

    if (age) {
      petsFiltered = this.items.filter((item) => item.age === age)
    }

    if (size) {
      petsFiltered = this.items.filter((item) => item.size === size)
    }

    return petsFiltered
  }
}
