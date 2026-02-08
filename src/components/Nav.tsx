import { logout } from 'lib/fe-auth'
import Button from './Button'
import Link from 'next/link'
export default function Nav() {
  return (
    <nav className=" bg-gray-100">
      <div className="flex flex-col text-center">
        <div className="text-2xl p-2">Výlety</div>
        <Link className="p-2 hover:bg-gray-200" href={'/'}>
          Domů
        </Link>
        <button className="p-2 hover:bg-gray-200 cursor-pointer" onClick={logout}>
          Odhlásit se
        </button>
        {/* <div>
          <Button onClick={logout} label="Odhlásit se" variant="primary" />
        </div> */}
      </div>
    </nav>
  )
}
