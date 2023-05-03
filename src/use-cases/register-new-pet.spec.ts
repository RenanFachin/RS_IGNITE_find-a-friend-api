import { expect, it, describe, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { RegisterNewPetUseCase } from './register-new-pet'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

// Precisa criar as variaveis globalmente e tipar
let organizationRepository: InMemoryOrganizationsRepository
let petRepository: InMemoryPetsRepository
let sut: RegisterNewPetUseCase

describe('Register New Pet Use Case', () => {
  beforeEach(async () => {
    // Aqui é onde iremos dar o valor as variáveis criadas

    // Instanciando o banco de dados in memory criado para os testes
    organizationRepository = new InMemoryOrganizationsRepository()
    petRepository = new InMemoryPetsRepository()

    // Instanciando o caso de uso
    sut = new RegisterNewPetUseCase(organizationRepository, petRepository)

    await organizationRepository.create({
      id: 'organization-1',
      name: 'ORG Test',
      responsable_name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('1234567', 6),
      address: 'Rua dos testes',
      city: 'Typescript City',
      postal_code: '92000000',
    })
  })

  it('should be able to register a new pet', async () => {
    // Criando um pet nesta organização
    const { pet } = await sut.execute({
      name: 'ORG Test',
      description: 'Pet muito calmo',
      age: 'FILHOTE',
      energy_level: 'CALM',
      size: 'MEDIUM',
      organization_id: 'organization-1',
    })

    // console.log(pet)

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should be able to register a new pet without description', async () => {
    // Criando um pet nesta organização
    const { pet } = await sut.execute({
      name: 'ORG Test',
      description: null,
      age: 'FILHOTE',
      energy_level: 'CALM',
      size: 'MEDIUM',
      organization_id: 'organization-1',
    })

    // console.log(pet)

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to register a new pet without a valid organization', async () => {
    // Criando um pet nesta organização
    await expect(() =>
      sut.execute({
        name: 'ORG Test',
        description: 'Pet muito calmo',
        age: 'FILHOTE',
        energy_level: 'CALM',
        size: 'MEDIUM',
        organization_id: 'organization-invalid',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to register a new pet with invalid age data', async () => {
    // Criando um pet nesta organização
    // Criando um pet nesta organização
    await expect(() =>
      sut.execute({
        name: 'ORG Test',
        description: 'Pet muito calmo',
        age: 'AGE-INVALID',
        energy_level: 'CALM',
        size: 'MEDIUM',
        organization_id: 'organization-invalid',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to register a new pet with invalid energy_level data', async () => {
    // Criando um pet nesta organização
    await expect(() =>
      sut.execute({
        name: 'ORG Test',
        description: 'Pet muito calmo',
        age: 'FILHOTE',
        energy_level: 'ENERGY-LEVEL-INVALID',
        size: 'MEDIUM',
        organization_id: 'organization-invalid',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to register a new pet with invalid SIZE data', async () => {
    // Criando um pet nesta organização
    await expect(() =>
      sut.execute({
        name: 'ORG Test',
        description: 'Pet muito calmo',
        age: 'FILHOTE',
        energy_level: 'CALM',
        size: 'SIZE-INVALID',
        organization_id: 'organization-invalid',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
