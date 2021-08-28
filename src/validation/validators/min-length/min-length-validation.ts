import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

export class MinLengthValidation implements FieldValidation {
  constructor (readonly field: string, private readonly minLegth: number) {}

  validate (input: object): Error {
    return input[this.field]?.length < this.minLegth ? new InvalidFieldError(this.field) : null
  }
}
