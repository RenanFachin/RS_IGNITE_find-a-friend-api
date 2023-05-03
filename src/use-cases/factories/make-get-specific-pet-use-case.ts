import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'
import { GetSpecificPetUseCase } from '../get-specific-pet'

export function makeGetSpecificPetUseCase() {
  const petRepository = new PrismaPetsRepository()

  const getSpecificPetUseCase = new GetSpecificPetUseCase(petRepository)

  return getSpecificPetUseCase
}
