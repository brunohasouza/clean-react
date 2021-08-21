import { render, RenderResult } from '@testing-library/react'
import React from 'react'
import Signup from './signup'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(
    <Signup />
  )

  return {
    sut
  }
}

const testChildCount = (sut: RenderResult, fieldName: string, count: number) => {
  const el = sut.getByTestId(fieldName)
  expect(el.childElementCount).toBe(count)
}

const testButtonIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean) => {
  const el = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(el.disabled).toBe(isDisabled)
}

const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string) => {
  const el = sut.getByTestId(`${fieldName}-status`)
  expect(el.title).toBe(validationError || 'Tudo certo!')
  expect(el.textContent).toBe(validationError ? '🔴' : '🟢')
}

describe('SignUp Component', () => {  
  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    const { sut } = makeSut()
    testChildCount(sut, 'error-wrap', 0)
    testButtonIsDisabled(sut, 'submit', true)
    testStatusForField(sut, 'name', validationError)
    testStatusForField(sut, 'email', validationError)
    testStatusForField(sut, 'password', validationError)
    testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})