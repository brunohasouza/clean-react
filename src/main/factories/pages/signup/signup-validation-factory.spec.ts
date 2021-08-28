import { ValidationBuilder as Builder, ValidationComposite } from '@/validation/validators'
import { makeSignupValidation } from './signup-validation-factory'

describe('SignupValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeSignupValidation()
    expect(composite).toEqual(ValidationComposite.build([
      ...Builder.field('name').required().minLength(5).build(),
      ...Builder.field('email').required().email().build(),
      ...Builder.field('password').required().minLength(5).build(),
      ...Builder.field('passwordConfirmation').required().sameAs('password').build()
    ]))
  })
})
