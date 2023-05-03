export class ResourceNotFoundError extends Error {
  constructor() {
    // super é um método de Error
    super('Resource not found.')
  }
}
