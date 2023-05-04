import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { hash } from 'bcryptjs'
import { FetchAllPetsInASpecificCityUseCase } from './fetch-all-pets-in-a-specific-city'

// Precisa criar as variaveis globalmente e tipar
let petRepository: InMemoryPetsRepository
let organizationRepository: InMemoryOrganizationsRepository
let sut: FetchAllPetsInASpecificCityUseCase

describe('Search pets by city Use Case', () => {
  beforeEach(() => {
    // Aqui é onde iremos dar o valor as variáveis criadas

    // Instanciando o banco de dados in memory criado para os testes
    petRepository = new InMemoryPetsRepository()
    organizationRepository = new InMemoryOrganizationsRepository()

    // Instanciando o caso de uso
    sut = new FetchAllPetsInASpecificCityUseCase(
      petRepository,
      organizationRepository,
    )
  })

  it('should be able to list all pets based in city', async () => {
    // CRIA a ORGANIZAÇÃO
    const organization = await organizationRepository.create({
      id: 'org 01',
      name: 'ORG Test',
      responsable_name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      address: 'Rua dos testes',
      city: 'Porto Alegre',
      postal_code: '92000000',
    })

    await organizationRepository.create({
      id: 'org 02',
      name: 'ORG Test 2',
      responsable_name: 'John Doe',
      email: 'johndoe2@example.com',
      password_hash: await hash('123456', 6),
      address: 'Rua dos testes',
      city: 'Canoas',
      postal_code: '92000000',
    })

    petRepository.create({
      name: 'pet test - 02',
      description: 'Pet muito calmo',
      age: 'FILHOTE',
      energy_level: 'CALM',
      size: 'MEDIUM',
      organization_id: organization.id,
    })

    const { pets } = await sut.execute({ city: 'Canoas' })

    expect(pets).toHaveLength(1)
  })
})
