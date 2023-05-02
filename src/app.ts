import fastify from 'fastify'
import { organizationRoutes } from './http/controllers/organizations/routes'

export const app = fastify()

app.register(organizationRoutes)
