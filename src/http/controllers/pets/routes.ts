import { FastifyInstance } from 'fastify'
import { registerNewPet } from './register-new-pet'
import { getSpecificPet } from './get-specific-pet'

export async function petRoutes(app: FastifyInstance) {
  app.post('/register/pet', registerNewPet)

  app.get('/pet', getSpecificPet)
}
