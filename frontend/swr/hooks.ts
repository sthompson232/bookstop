import { useRouter } from 'next/router'
import useSWR from 'swr'
import type { SWRConfiguration } from 'swr'
// Constants
import { GET_USER_ENDPOINT, AUTHENTICATED_ROUTES, PORTAL_BLOG_LIST_ENDPOINT } from '../constants/urls'
import { defaultFetcher } from './fetchers'
// Utils
import { getCookie, setCookie } from '../utils/cookies'


export const useUser = () => {
	const router = useRouter()
	const config: SWRConfiguration = {
		refreshInterval: 60000,
		shouldRetryOnError: false,
		revalidateOnFocus: true,
		revalidateIfStale: false,
	}
	const { data, mutate, error } = useSWR(GET_USER_ENDPOINT, defaultFetcher, config)
	const loadingUser = !data && !error
	// isAuthenticated will need to use data to work this out in future as logged in user may get 403 trying to enter unauthorized page
	const isAuthenticated = !(error && error.status === 403)

	// If authenticated extend cookie expiry to 7 days as the token is auto refreshed on the backend
	if (isAuthenticated && typeof window !== 'undefined') {
		setCookie('token', getCookie('token'), 7)
	// If the user is no longer authenticated and on an authenticated page, redirect to the home page
	} else if (AUTHENTICATED_ROUTES.includes(router.route) && !isAuthenticated) {
		router.push('/')
	}

	return {
		loadingUser,
		isAuthenticated,
		user: data,
		mutate
	}
}


export const useBlogPost = (url: string) => {
	const config: SWRConfiguration = {
		refreshInterval: 30000,
		shouldRetryOnError: false,
		revalidateOnFocus: true,
	}
	const { data, mutate, error } = useSWR(url, defaultFetcher, config)
	const isLoading = !data && !error
	return {
		data,
		mutate,
		error,
		isLoading
	}
}
