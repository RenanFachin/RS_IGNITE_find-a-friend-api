import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { PetsRepository } from '@/repositories/pet-repository'
import { Pet, Age, EnergyLevel, Size } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface RegisterNewPetUseCaseParams {
  name: string
  description: string | null
  age: Age
  energy_level: EnergyLevel
  size: Size
  organization_id: string
}

interface RegisterNewPetUseCaseResponse {
  pet: Pet
}

// Dependency Inversion Principle
// Cada classe de use case vai ter apenas 1 único método

export class RegisterNewPetUseCase {
  // Classe pode usar construtor e receber as dependências como parâmetro
  constructor(
    private organizationRepository: OrganizationsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    name,
    description,
    age,
    energy_level,
    size,
    organization_id,
  }: RegisterNewPetUseCaseParams): Promise<RegisterNewPetUseCaseResponse> {
    // Verificando se a ORG existe
    const org = await this.organizationRepository.findById(organization_id)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    // Caso exista, cadastrar um pet
    const pet = await this.petsRepository.create({
      name,
      description,
      age,
      energy_level,
      size,
      organization_id,
    })

    // console.log(pet)

    return {
      pet,
    }
  }
}
