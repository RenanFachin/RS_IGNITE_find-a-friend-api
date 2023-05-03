import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredentials } from '@/use-cases/errors/invalid-credentials-erros'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    // É preciso instânciar a classe e passar por parâmetro as depêndencias
    const organizationRepository = new PrismaOrganizationsRepository()
    const authenticateUseCase = new AuthenticateUseCase(organizationRepository)

    // chamando o caso de uso e passando os params
    await authenticateUseCase.execute({
      email,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidCredentials) {
      return response.status(400).send({
        message: err.message,
      })
    }

    // Retornando um erro genérico
    throw err
  }

  return response.status(200).send()
}
