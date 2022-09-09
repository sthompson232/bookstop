import useSWR from 'swr'
import type { SWRConfiguration } from 'swr'
// Constants
import { GET_USER_ENDPOINT } from '../constants/urls'
import { defaultFetcher } from './fetchers'


export const useUser = () => {
	const config: SWRConfiguration = {
		refreshInterval: 60000,
		shouldRetryOnError: false,
		revalidateOnFocus: true,
		revalidateIfStale: false,
	}
	const { data, mutate, error } = useSWR(GET_USER_ENDPOINT, defaultFetcher, config)
	const loadingUser = !data && !error
	const isAuthenticated = !(error && error.status === 403)

	return {
		loadingUser,
		isAuthenticated,
		user: data,
		mutate
	}
}