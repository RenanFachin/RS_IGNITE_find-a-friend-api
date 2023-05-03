import { PetsRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetSpecificPetUseCaseRequest {
  petId: string
}

interface GetSpecificPetUseCaseResponse {
  pet: Pet
}

export class GetSpecificPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: GetSpecificPetUseCaseRequest): Promise<GetSpecificPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
