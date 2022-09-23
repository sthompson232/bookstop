import { useRouter } from 'next/router'
import { useSWRConfig } from 'swr'
// Local components
import Button from '../../../ui/Button'
// Constants
import { GET_USER_ENDPOINT, HOME_URL, LOGOUT_ENDPOINT } from '../../../../constants/urls'
// Utils
import { getRestAPIHeaders } from '../../../../utils/headers'
import { deleteCookie } from '../../../../utils/cookies'


const LogoutButton = () => {
  const router = useRouter()
  const { mutate } = useSWRConfig()

  const logout = async () => {
    await fetch(LOGOUT_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        ...getRestAPIHeaders(),
      },
    }).then(res => {
      deleteCookie('token')
      if (res.ok) {
        return { status: 'ok' }
      }
    })
    mutate(GET_USER_ENDPOINT)
    router.push(HOME_URL)
  }
  
  return (
    <Button className="btn-inverse" onClick={logout}>
      Logout
    </Button>
  )
}

export default LogoutButton
