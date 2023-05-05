import { it, describe, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('[e2e] - Authenticate', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to authenticate', async () => {
    await request(app.server).post('/register').send({
      name: 'ORG - TEST',
      responsable_name: 'Register Test',
      email: 'funcionando4@email.com',
      password: '1234567',
      address: 'Rua dos testes',
      city: 'Porto Alegre',
      postal_code: '92000000',
    })

    const response = await request(app.server).post('/session').send({
      email: 'funcionando4@email.com',
      password: '1234567',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      authToken: expect.any(String),
    })
  })
})
