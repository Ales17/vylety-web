import { login } from 'lib/fe-auth'

export default function Login() {
  return (
    <div>
      <form action={login}>
        <div>
          <input type="email" name="email" id="" />
        </div>
        <div>
          <input type="password" name="password" id="" />
        </div>
        <div>
          <input type="submit" value={'Přihlásit se'} />
        </div>
      </form>
    </div>
  )
}
