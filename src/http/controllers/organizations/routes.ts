import { FastifyInstance } from 'fastify'
import { register } from './register'

export async function organizationRoutes(app: FastifyInstance) {
  app.post('/register', register)
}
