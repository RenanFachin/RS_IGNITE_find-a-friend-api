export class PetNotExistingInDatabaseError extends Error {
  constructor() {
    // super é um método de Error
    super('Pet not found.')
  }
}
