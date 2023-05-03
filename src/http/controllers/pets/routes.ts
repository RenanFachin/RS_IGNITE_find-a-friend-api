import { FastifyInstance } from 'fastify'
import { registerNewPet } from './register-new-pet'

export async function petRoutes(app: FastifyInstance) {
  app.post('/register/pet', registerNewPet)
}
