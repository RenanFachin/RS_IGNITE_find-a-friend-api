import { expect, it, describe, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { OrganizationAlreadyExists } from './errors/organization-already-exists-error'

// Precisa criar as variaveis globalmente e tipar
let organizationRepository: InMemoryOrganizationsRepository
let sut: RegisterUseCase

describe('Register Org Use Case', () => {
  beforeEach(() => {
    // Aqui é onde iremos dar o valor as variáveis criadas

    // Instanciando o banco de dados in memory criado para os testes
    organizationRepository = new InMemoryOrganizationsRepository()

    // Instanciando o caso de uso
    sut = new RegisterUseCase(organizationRepository)
  })

  it('should be able to register a new organization', async () => {
    const { organization } = await sut.execute({
      name: 'ORG Test',
      responsable_name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234567',
      address: 'Rua dos testes',
      city: 'Typescript City',
      postal_code: '92000000',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should hash org password upon registration', async () => {
    const { organization } = await sut.execute({
      name: 'ORG Test',
      responsable_name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234567',
      address: 'Rua dos testes',
      city: 'Typescript City',
      postal_code: '92000000',
    })

    const isPasswordCorrectlyHashed = await compare(
      '1234567',
      organization.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'ORG Test',
      responsable_name: 'John Doe',
      email,
      password: '1234567',
      address: 'Rua dos testes',
      city: 'Typescript City',
      postal_code: '92000000',
    })

    await expect(() =>
      sut.execute({
        name: 'ORG Test [2]',
        responsable_name: 'John Doe',
        email,
        password: '1234567',
        address: 'Rua dos testes',
        city: 'Typescript City',
        postal_code: '92000000',
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExists)
  })

  it('should not be able to register an organization with same name twice', async () => {
    const name = 'ORG Test'

    await sut.execute({
      name,
      responsable_name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234567',
      address: 'Rua dos testes',
      city: 'Typescript City',
      postal_code: '92000000',
    })

    await expect(() =>
      sut.execute({
        name,
        responsable_name: 'John Doe',
        email: 'johndoe2@example.com',
        password: '1234567',
        address: 'Rua dos testes',
        city: 'Typescript City',
        postal_code: '92000000',
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExists)
  })
})
