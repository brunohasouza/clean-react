import { ValidationBuilder, ValidationComposite } from '@/validation/validators'
import { makeLoginValidation } from './login-validation-factory'

describe('LoginValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(ValidationComposite.build([
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().minLength(5).build()
    ]))
  })
})
