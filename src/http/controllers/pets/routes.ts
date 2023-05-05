import { FastifyInstance } from 'fastify'
import { registerNewPet } from './register-new-pet'
import { getSpecificPet } from './get-specific-pet'
import { searchPets } from './search-pets'
import { searchAllPetsByCity } from './search-all-pets-by-city'
import { verifyJWT } from '../middlewares/verify-jwt'

export async function petRoutes(app: FastifyInstance) {
  app.get('/pet/:id', getSpecificPet)
  app.get('/search/:city', searchPets)
  app.get('/searchByCity/:city', searchAllPetsByCity)

  // Autenticação
  app.post('/register/pet', { onRequest: [verifyJWT] }, registerNewPet)
}
