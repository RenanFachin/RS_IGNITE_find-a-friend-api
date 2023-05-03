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

  const registerNewPetUseCase = makeRegisterNewPetUseCase()

  // chamando o caso de uso e passando os params
  const { pet } = await registerNewPetUseCase.execute({
    name,
    description,
    age,
    energy_level,
    size,
    organization_id,
  })

  return response.status(201).send({ pet })
}
