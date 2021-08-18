import faker from 'faker'

import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (field = faker.database.column(), valueToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(field, valueToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(field, faker.random.word())
    const error = sut.validate(faker.random.word())

    expect(error).toEqual(new InvalidFieldError(field))
  })

  test('Should return falsy if compare is valid', () => {
    const valueToCompare = faker.random.word()
    const sut = makeSut(faker.database.column(), valueToCompare)
    const error = sut.validate(valueToCompare)

    expect(error).toBeFalsy()
  })
})
