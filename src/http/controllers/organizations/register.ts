import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { OrganizationAlreadyExists } from '@/use-cases/errors/organization-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

export async function register(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    responsable_name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    address: z.string(),
    city: z.string(),
    postal_code: z.string(),
  })

  const {
    name,
    responsable_name,
    email,
    password,
    address,
    city,
    postal_code,
  } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    // chamando o caso de uso e passando os params
    await registerUseCase.execute({
      name,
      responsable_name,
      email,
      password,
      address,
      city,
      postal_code,
    })
  } catch (err) {
    if (err instanceof OrganizationAlreadyExists) {
      return response.status(409).send({
        message: err.message,
      })
    }

    // Retornando um erro genérico
    throw err
  }

  return response.status(201).send()
}
