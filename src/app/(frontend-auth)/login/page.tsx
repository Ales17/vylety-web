import { login } from 'lib/fe-auth'
import Input from '@/components/Input'
import Button from '@/components/Button'

export default function Login() {
  return (
    <div>
      <form action={login}>
        <Input type={'email'} name={'email'} placeholder="email@email.cz" label="E-mail" />
        <Input type="password" name="password" placeholder="******" label="Heslo" />
        <Button label={'Přihlásit se'} variant="primary" />
      </form>
    </div>
  )
}
