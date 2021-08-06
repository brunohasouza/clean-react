import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from './email-validation'

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const fieldName = 'email'
    const sut = new EmailValidation(fieldName)
    const error = sut.validate('')

    expect(error).toEqual(new InvalidFieldError(fieldName))
  })
})
