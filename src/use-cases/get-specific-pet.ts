import { PetsRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'
import { PetNotExistingInDatabaseError } from './errors/pet-not-existing-in-database-error'

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

    console.log(pet)

    if (!pet) {
      throw new PetNotExistingInDatabaseError()
    }

    return {
      pet,
    }
  }
}
