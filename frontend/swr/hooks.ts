import useSWR from 'swr'
import type { SWRConfiguration } from 'swr'
// Constants
import { GET_USER_ENDPOINT } from '../constants/urls'


export const useUser = (config?: SWRConfiguration) => {
	const { data, mutate, error } = useSWR(GET_USER_ENDPOINT, config)
	const loading = !data && !error
	const isAuthenticated = !(error && error.status === 403)

	return {
		loading,
		isAuthenticated,
		user: data,
		mutate
	}
}