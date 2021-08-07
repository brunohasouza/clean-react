import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

export class MinLengthValidation implements FieldValidation {
  constructor (readonly field: string, private readonly minLegth: number) {}

  validate (value: string): Error {
    return value.length >= this.minLegth ? null : new InvalidFieldError(this.field)
  }
}
