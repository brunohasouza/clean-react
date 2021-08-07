import faker from 'faker'

import { FieldValidationSpy } from '@/validation/test'
import { ValidationComposite } from './validate-composite'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]

  const sut = ValidationComposite.build(fieldValidationsSpy)

  return {
    sut,
    fieldValidationsSpy
  }
}

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const errorMessage = faker.random.words()
    const fieldName = faker.database.column()
    const { sut, fieldValidationsSpy } = makeSut(fieldName)

    fieldValidationsSpy[0].error = new Error(errorMessage)
    fieldValidationsSpy[1].error = new Error(faker.random.words())

    const error = sut.validate(fieldName, faker.random.word())

    expect(error).toBe(error)
  })

  test('Should return falsy if all validations are success', () => {
    const fieldName = faker.database.column()
    const { sut } = makeSut(fieldName)

    const error = sut.validate(fieldName, faker.random.word())

    expect(error).toBeFalsy()
  })
})
