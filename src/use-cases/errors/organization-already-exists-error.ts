export class OrganizationAlreadyExists extends Error {
  constructor() {
    super('E-mail or organization name already exists.')
  }
}
