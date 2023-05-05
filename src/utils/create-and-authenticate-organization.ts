import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrganization(app: FastifyInstance) {
  // Cria a organização
  await request(app.server).post('/register').send({
    name: 'ORG - TEST',
    responsable_name: 'Register Test',
    email: 'funcionando4@email.com',
    password: '1234567',
    address: 'Rua dos testes',
    city: 'Porto Alegre',
    postal_code: '92000000',
  })

  // Realiza o login
  const authResponse = await request(app.server).post('/session').send({
    email: 'funcionando4@email.com',
    password: '1234567',
  })

  const { authToken } = authResponse.body

  return { authToken }
}
