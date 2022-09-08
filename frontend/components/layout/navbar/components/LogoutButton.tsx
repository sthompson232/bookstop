// Constants
import { GET_USER_ENDPOINT, LOGOUT_ENDPOINT } from '../../../../constants/urls'
// Utils
import { getRestAPIHeaders } from '../../../../utils/headers'
import { deleteCookie } from '../../../../utils/cookies'
import { useSWRConfig } from 'swr'


const LogoutButton = () => {
	const { mutate } = useSWRConfig()
	const logout = async () => {
		const result = await fetch(LOGOUT_ENDPOINT, {
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
		console.log(result);
	}
	return (
		<button onClick={logout} className="text-white"><h5>Logout</h5></button>
	)
}

export default LogoutButton
