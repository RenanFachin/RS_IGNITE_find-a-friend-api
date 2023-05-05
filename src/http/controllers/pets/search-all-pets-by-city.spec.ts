import { it, describe, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/create-and-authenticate-organization'

describe('[e2e] - Fetch all pet by city', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able fetch all pets in a specific city', async () => {
    const { authToken } = await createAndAuthenticateOrganization(app)

    const city = 'Canoas'

    await request(app.server)
      .post('/register/pet')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Animal de teste - 01',
        description: 'Pet muito calmo',
        age: 'FILHOTE',
        energy_level: 'CALM',
        size: 'SMALL',
      })

    await request(app.server)
      .post('/register/pet')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Animal de teste - 02',
        description: 'Pet muito calmo',
        age: 'SENIOR',
        energy_level: 'PEACEFUL',
        size: 'BIG',
      })

    await request(app.server)
      .post('/register/pet')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Animal de teste - 03',
        description: 'Pet muito calmo',
        age: 'ADULTO',
        energy_level: 'PEACEFUL',
        size: 'MEDIUM',
      })

    await request(app.server)
      .post('/register/pet')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Animal de teste - 04',
        description: 'Pet muito calmo',
        age: 'FILHOTE',
        energy_level: 'PEACEFUL',
        size: 'BIG',
      })

    const response = await request(app.server)
      .get(`/searchByCity/${city}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(4)
  })
})
