import useSWR from 'swr'
import { GET_USER_ENDPOINT } from '../constants/urls'



export const useUser = () => {
	const { data, mutate, error } = useSWR(GET_USER_ENDPOINT)
	const loading = !data && !error
	const loggedOut = error && error.status === 403
	return {
		loading,
		loggedOut,
		user: data,
		mutate
	}
}