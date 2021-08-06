export class InvalidFieldError extends Error {
  constructor (readonly fieldName: string) {
    super(`Campo ${fieldName} inválido`)
  }
}
