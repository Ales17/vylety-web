import { logout } from 'lib/fe-auth'
import Button from './Button'
export default function Nav() {
  return (
    <div>
      <Button onClick={logout} label="Odhlásit se" variant="primary" />
    </div>
  )
}
