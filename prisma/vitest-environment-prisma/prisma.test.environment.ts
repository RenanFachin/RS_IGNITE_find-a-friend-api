import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { Environment } from 'vitest'
import { PrismaClient } from '@prisma/client'

// postgresql://docker:docker@localhost:5432/apisolidfindfriend?schema=public

const prisma = new PrismaClient()

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  // Trocando a url do db, trocando o public pela variável recebida na função
  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  async setup() {
    // Gerando um banco de dados único para cada switch de testes
    const schema = randomUUID()
    const databaseURL = generateDatabaseURL(schema)

    // Sobreescrevendo as variáveis de ambiente
    process.env.DATABASE_URL = databaseURL

    // Rodando as migrations
    // a flag deploy é para o prisma não fazer uma comparação com os bancos antigos
    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )

        await prisma.$disconnect()
      },
    }
  },
}
