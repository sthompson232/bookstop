import Link from 'next/link'
// Local component
import LogoutButton from './LogoutButton'
// Constants
import { LOGIN_URL, PORTAL_URL } from '../../../../constants/urls'
// Utils
import { useUser } from '../../../../swr/hooks'
import Button from '../../../ui/Button'


const AdminPanel = () => {
  const { loadingUser, isAuthenticated, user } = useUser()

  return (
    <div className="bg-black p-3">
      {loadingUser
        ? (
          'Loading' 
        ) : (isAuthenticated 
          ? (
            <div className="flex justify-between items-center">
              <h5 className="text-white">{user?.email}</h5>
              <div className="flex space-x-2">
                <Link href={PORTAL_URL} passHref>
                  <Button className="btn-inverse">
                    Portal
                  </Button>
                </Link>
                <LogoutButton />
              </div>
            </div>
          ) : (
            <div className="flex justify-end items-center">
              <Link href={LOGIN_URL} passHref>
                <Button className="btn-inverse">
                  Login
                </Button>
              </Link>
            </div>
          )
        )
      }
    </div>
  )
}

export default AdminPanel
