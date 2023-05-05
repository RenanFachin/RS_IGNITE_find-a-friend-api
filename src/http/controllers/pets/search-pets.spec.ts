import { it, describe, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/create-and-authenticate-organization'

describe('[e2e] - fetch pet by city', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able fetch pet by city', async () => {
    const { authToken } = await createAndAuthenticateOrganization(app)

    await request(app.server)
      .post('/register/pet')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Animal de teste',
        description: 'Pet muito calmo',
        age: 'FILHOTE',
        energy_level: 'CALM',
        size: 'MEDIUM',
      })

    const response = await request(app.server)
      .get('/search/')
      .query({
        city: 'Canoas',
      })
      .send()

    expect(response.statusCode).toEqual(200)
  })

  it('Should be able fetch pet caracteristc', async () => {
    const { authToken } = await createAndAuthenticateOrganization(app)

    await request(app.server)
      .post('/register/pet')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Animal de teste',
        description: 'Pet muito calmo',
        age: 'FILHOTE',
        energy_level: 'CALM',
        size: 'MEDIUM',
      })

    await request(app.server)
      .post('/register/pet')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Animal de teste - 2',
        description: 'Pet muito calmo',
        age: 'ADULTO',
        energy_level: 'CALM',
        size: 'MEDIUM',
      })

    const response = await request(app.server)
      .get('/search/')
      .query({
        age: 'ADULTO',
      })
      .send()

    expect(response.statusCode).toEqual(200)
  })
})
