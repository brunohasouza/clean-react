import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from './email-validation'
import faker from 'faker'

const makeSut = (field: string): EmailValidation => new EmailValidation(field)

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const fieldName = faker.random.word()
    const sut = makeSut(fieldName)
    const error = sut.validate({ [fieldName]: faker.random.word() })

    expect(error).toEqual(new InvalidFieldError(fieldName))
  })

  test('Should return falsy if email is valid', () => {
    const fieldName = faker.random.word()
    const sut = makeSut(fieldName)
    const error = sut.validate({ [fieldName]: faker.internet.email() })

    expect(error).toBeFalsy()
  })

  test('Should return falsy if email is empty', () => {
    const fieldName = faker.random.word()
    const sut = makeSut(fieldName)
    const error = sut.validate({ [fieldName]: '' })

    expect(error).toBeFalsy()
  })
})
