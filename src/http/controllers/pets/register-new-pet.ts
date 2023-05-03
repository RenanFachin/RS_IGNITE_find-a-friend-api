import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeRegisterNewPetUseCase } from '@/use-cases/factories/make-register-new-pet-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function registerNewPet(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const registerNewPetBodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    age: z.enum(['FILHOTE', 'ADULTO', 'SENIOR']),
    energy_level: z.enum(['CALM', 'PEACEFUL', 'FUSSY']),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG']),
    organization_id: z.string(),
  })

  const { name, description, age, energy_level, size, organization_id } =
    registerNewPetBodySchema.parse(request.body)

  try {
    const registerNewPetUseCase = makeRegisterNewPetUseCase()

    // chamando o caso de uso e passando os params
    await registerNewPetUseCase.execute({
      name,
      description,
      age,
      energy_level,
      size,
      organization_id,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return response.status(409).send({
        message: err.message,
      })
    }

    // Retornando um erro genérico
    throw err
  }

  return response.status(201).send()
}
