import faker from 'faker'
import { AddAccountParams } from '@/domain/usecases'

export const mockAddAccountParams = (): AddAccountParams => {
  const password = faker.internet.password()

  return {
    email: faker.internet.email(),
    name: faker.name.findName(),
    password,
    passwordConfirmation: password
  }
}
