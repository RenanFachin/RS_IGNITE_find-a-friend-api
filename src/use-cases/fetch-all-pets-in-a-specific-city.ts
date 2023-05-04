import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { PetsRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchAllPetsInASpecificCityUseCaseRequest {
  city: string
}

interface FetchAllPetsInASpecificCityUseCaseResponse {
  pets: Pet[]
}

export class FetchAllPetsInASpecificCityUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private organizationRepository: OrganizationsRepository,
  ) {}

  async execute({
    city,
  }: FetchAllPetsInASpecificCityUseCaseRequest): Promise<FetchAllPetsInASpecificCityUseCaseResponse> {
    const organizations = await this.organizationRepository.findPetsByCity(city)

    if (organizations.length === 0) {
      throw new ResourceNotFoundError()
    }

    const pets = await this.petsRepository.findManyByOrgs(organizations)

    return {
      pets,
    }
  }
}
