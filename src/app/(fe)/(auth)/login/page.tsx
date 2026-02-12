'use client'
import { magicLinkLogin, passwordLogin } from 'lib/fe-auth'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { useActionState } from 'react'

const initialState = {
  message: '',
}

const actionToUse = process.env.NEXT_PUBLIC_AUTH_METHOD === 'magic' ? magicLinkLogin : passwordLogin

export default function Login() {
  const [state, formAction, pending] = useActionState(actionToUse, initialState)

  return (
    <div>
      <form action={formAction}>
        <Input
          type={'email'}
          name={'email'}
          id="email"
          placeholder="email@email.cz"
          label="E-mail"
        />
        {process.env.NEXT_PUBLIC_AUTH_METHOD === 'password' && (
          <Input type="password" name="password" id="password" placeholder="******" label="Heslo" />
        )}
        <Button label={'Přihlásit se'} variant="primary" />
        <p aria-live="polite">{state?.message}</p>
      </form>
    </div>
  )
}
