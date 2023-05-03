import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentials } from './errors/invalid-credentials-erros'

// Precisa criar as variaveis globalmente e tipar
let organizationRepository: InMemoryOrganizationsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    // Aqui é onde iremos dar o valor as variáveis criadas

    // Instanciando o banco de dados in memory criado para os testes
    organizationRepository = new InMemoryOrganizationsRepository()

    // Instanciando o caso de uso
    sut = new AuthenticateUseCase(organizationRepository)
  })

  it('should be to authenticate', async () => {
    await organizationRepository.create({
      name: 'ORG Test',
      responsable_name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('1234567', 6),
      address: 'Rua dos testes',
      city: 'Typescript City',
      postal_code: '92000000',
    })

    const { organization } = await sut.execute({
      email: 'johndoe@example.com',
      password: '1234567',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await organizationRepository.create({
      name: 'ORG Test',
      responsable_name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('1234567', 6),
      address: 'Rua dos testes',
      city: 'Typescript City',
      postal_code: '92000000',
    })

    await expect(() =>
      sut.execute({
        email: 'email@example.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentials)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await organizationRepository.create({
      name: 'ORG Test',
      responsable_name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('abcdefg', 6),
      address: 'Rua dos testes',
      city: 'Typescript City',
      postal_code: '92000000',
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentials)
  })
})
