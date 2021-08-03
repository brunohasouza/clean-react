import React from 'react'
import faker from 'faker'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'

import Login from './login'
import { Validation } from '@/presentation/protocols/validation'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
  errorMessage: string
  input: object

  validate (input: object): string {
    this.input = input
    return this.errorMessage
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy}/>)

  return {
    sut,
    validationSpy
  }
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const { sut } = makeSut()

    const errorWrap = sut.getByTestId('error-wrap')

    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    expect(submitButton.disabled).toBe(true)

    const emailStatus = sut.getByTestId('email-status')

    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = sut.getByTestId('password-status')

    expect(passwordStatus.title).toBe('Campo obrigatório')
  })

  test('Should call Validation with correct email', () => {
    const { sut, validationSpy } = makeSut()
    const fakeEmail = faker.internet.email()
    const emailInput = sut.getByTestId('email')

    fireEvent.input(emailInput, { target: { value: fakeEmail } })

    expect(validationSpy.input).toEqual({
      email: fakeEmail
    })
  })

  test('Should call Validation with correct password', () => {
    const { sut, validationSpy } = makeSut()
    const fakePassword = faker.internet.password()
    const passwordInput = sut.getByTestId('password')

    fireEvent.input(passwordInput, { target: { value: fakePassword } })

    expect(validationSpy.input).toEqual({
      password: fakePassword
    })
  })
})
