import { PetsRepository } from '@/repositories/pet-repository'
import { Age, EnergyLevel, Pet, Size } from '@prisma/client'

interface SearchPetsUseCaseRequest {
  city: string
  age: Age | null
  energy_level: EnergyLevel | null
  size: Size | null
}

type SearchPetsUseCaseResponse = {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petRepository: PetsRepository) { }

  async execute(
    data: SearchPetsUseCaseRequest,
  ): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petRepository.findManyByQuery(data)

    return {
      pets,
    }
  }
}
