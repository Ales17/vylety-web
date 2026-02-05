'use client'
import { login } from 'lib/fe-auth'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { useActionState } from 'react'

const initialState = {
  message: '',
}
export default function Login() {
  const [state, formAction, pending] = useActionState(login, initialState)

  return (
    <div>
      <form action={formAction}>
        <Input type={'email'} name={'email'} placeholder="email@email.cz" label="E-mail" />
        <Input type="password" name="password" placeholder="******" label="Heslo" />
        <Button label={'Přihlásit se'} variant="primary" />
        <p aria-live="polite">{state?.message}</p>
      </form>
    </div>
  )
}
