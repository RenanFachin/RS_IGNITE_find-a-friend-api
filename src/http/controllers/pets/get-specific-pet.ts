import { makeGetSpecificPetUseCase } from '@/use-cases/factories/make-get-specific-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getSpecificPet(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const getSpecificPetQuerySchema = z.object({
    id: z.string(),
  })

  const { id } = getSpecificPetQuerySchema.parse(request.query)

  const getSpecificPet = makeGetSpecificPetUseCase()

  const { pet } = await getSpecificPet.execute({
    petId: id,
  })

  console.log(pet)

  response.status(201).send({ pet })
}
