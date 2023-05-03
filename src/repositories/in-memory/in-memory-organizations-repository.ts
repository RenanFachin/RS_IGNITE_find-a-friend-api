import { Prisma, Organization } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'

export class InMemoryOrganizationsRepository
  // eslint-disable-next-line prettier/prettier
  implements OrganizationsRepository {

  public items: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = {
      id: 'organization-1',
      name: data.name,
      responsable_name: data.responsable_name,
      email: data.email,
      password_hash: data.password_hash,
      address: data.address,
      city: data.city,
      postal_code: data.postal_code,
      created_at: new Date(),
    }

    this.items.push(organization)

    return organization
  }

  async findByEmailOrName(email: string, name: string) {
    const organization = this.items.find(
      (item) => item.email === email || item.name === name,
    )

    if (!organization) {
      return null
    }

    return organization
  }

  async findByEmail(email: string) {
    const organization = this.items.find((item) => item.email === email)

    if (!organization) {
      return null
    }

    return organization
  }

  async findById(id: string) {
    const organization = this.items.find((item) => item.id === id)

    if (!organization) {
      return null
    }

    return organization
  }
}
