import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetSpecificPetUseCase } from './get-specific-pet'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { hash } from 'bcryptjs'
import { PetNotExistingInDatabaseError } from './errors/pet-not-existing-in-database-error'

// Precisa criar as variaveis globalmente e tipar
let petRepository: InMemoryPetsRepository
let organizationRepository: InMemoryOrganizationsRepository
let sut: GetSpecificPetUseCase

describe('Authenticate Use Case', () => {
  beforeEach(async () => {
    // Aqui é onde iremos dar o valor as variáveis criadas

    // Instanciando o banco de dados in memory criado para os testes
    petRepository = new InMemoryPetsRepository()
    organizationRepository = new InMemoryOrganizationsRepository()

    // Instanciando o caso de uso
    sut = new GetSpecificPetUseCase(petRepository)

    // CRIA a ORGANIZAÇÃO
    await organizationRepository.create({
      id: 'Organization-01',
      name: 'ORG Test',
      responsable_name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      address: 'Rua dos testes',
      city: 'Typescript City',
      postal_code: '92000000',
    })
  })

  it('should be to get specific pet by petId', async () => {
    // CRIA o PET
    const newPet = await petRepository.create({
      name: 'PET Test',
      description: 'Pet muito calmo',
      age: 'FILHOTE',
      energy_level: 'CALM',
      size: 'MEDIUM',
      organization_id: 'Organization-01',
    })

    const { pet } = await sut.execute({
      petId: newPet.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('PET Test')
    expect(pet.organization_id).toEqual('Organization-01')
  })

  it('should not be to get specific pet by invalid petID', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(PetNotExistingInDatabaseError)
  })
})
