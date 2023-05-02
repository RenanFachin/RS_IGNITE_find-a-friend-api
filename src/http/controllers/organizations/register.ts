import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { hash } from 'bcryptjs'

export async function register(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    responsable_name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    address: z.string(),
    city: z.string(),
    postal_code: z.string(),
  })

  const {
    name,
    responsable_name,
    email,
    password,
    address,
    city,
    postal_code,
  } = registerBodySchema.parse(request.body)

  const password_hash = await hash(password, 6)

  const organizationWithSameEmailOrName = await prisma.organization.findFirst({
    where: {
      OR: [
        {
          email: {
            equals: email,
          },
        },
        {
          name: {
            equals: name,
          },
        },
      ],
    },
  })

  if (organizationWithSameEmailOrName) {
    return response.status(409).send()
  }

  await prisma.organization.create({
    data: {
      name,
      responsable_name,
      email,
      password_hash,
      address,
      city,
      postal_code,
    },
  })

  return response.status(201).send()
}
