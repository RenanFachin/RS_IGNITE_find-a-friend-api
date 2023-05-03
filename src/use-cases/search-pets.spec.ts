import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchPetsUseCase } from './search-pets'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { hash } from 'bcryptjs'

// Precisa criar as variaveis globalmente e tipar
let petRepository: InMemoryPetsRepository
let organizationRepository = new InMemoryOrganizationsRepository()
let sut: SearchPetsUseCase

describe('Search Pets Use Case', () => {
  beforeEach(async () => {
    // Aqui é onde iremos dar o valor as variáveis criadas

    // Instanciando o banco de dados in memory criado para os testes
    petRepository = new InMemoryPetsRepository()
    organizationRepository = new InMemoryOrganizationsRepository()

    // Instanciando o caso de uso
    sut = new SearchPetsUseCase(petRepository)

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

  it('should be to search for pets at a specific filter', async () => {
    for (let i = 1; i <= 2; i++) {
      await petRepository.create({
        id: `pet-0${i}`,
        name: `pet-0${i}`,
        description: 'Pet muito calmo',
        age: 'FILHOTE',
        energy_level: 'CALM',
        size: 'MEDIUM',
        organization_id: 'Organization-01',
      })
    }

    const { pets } = await sut.execute({
      city: 'Typescript City',
      age: 'FILHOTE',
      energy_level: null,
      size: null,
    })

    console.log(pets)

    expect(pets).toHaveLength(2)
  })
})
