import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'
import { RegisterNewPetUseCase } from '../register-new-pet'

export function makeRegisterNewPetUseCase() {
  const organizationRepository = new PrismaOrganizationsRepository()
  const petRepository = new PrismaPetsRepository()

  const registerNewPetUseCase = new RegisterNewPetUseCase(
    organizationRepository,
    petRepository,
  )

  return registerNewPetUseCase
}
