import React, { useEffect, useState } from 'react'
import Styles from './signup-styles.scss'
import { LoginHeader, Input, FormStatus, Footer } from '@/presentation/components'
import FormContext from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'

type Props = {
  validation: Validation
}

const Signup: React.FC<Props> = ({ validation }) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    mainError: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    nameError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate('passwordConfirmation', state.passwordConfirmation)
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  return (
    <div className={Styles.signup}>
      <LoginHeader/>
      <FormContext.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Criar Conta</h2>
          <Input
            type="text"
            name="name"
            placeholder="Digite seu nome"
          />
          <Input
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
          />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Repita sua senha"
          />
          <button
            data-testid="submit"
            className={Styles.submit}
            type="submit"
            disabled={!!state.emailError || !!state.passwordError || !!state.nameError || !!state.passwordConfirmationError}
          >Entrar</button>
          <span className={Styles.link}>Voltar para Login</span>
          <FormStatus/>
        </form>
      </FormContext.Provider>
      <Footer/>
    </div>
  )
}

export default Signup
