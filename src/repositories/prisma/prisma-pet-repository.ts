import { Organization, Prisma } from '@prisma/client'
import { PetsRepository, SearchPetsProps } from '../pet-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findFirst({
      where: {
        id,
      },
    })

    return pet
  }

  async findManyByQuery({ city, age, energy_level, size }: SearchPetsProps) {
    const query: any = {}

    if (age !== null) {
      query.age = age
    }

    if (energy_level !== null) {
      query.energy_level = energy_level
    }

    if (size !== null) {
      query.size = size
    }

    const pets = await prisma.pet.findMany({
      where: {
        organization: {
          city,
        },
        ...query,
      },
    })

    return pets
  }

  async findManyByOrgs(orgs: Organization[]) {
    const orgsIdArr = orgs.map((org) => org.id)

    const pets = await prisma.pet.findMany({
      where: {
        organization_id: {
          in: orgsIdArr,
        },
      },
    })

    return pets
  }
}
