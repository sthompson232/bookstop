import { getCookie } from '../utils/cookies'


interface Headers {
	[key: string]: any
}

export const defaultFetcher = async (url: string) => {
	const headers: Headers = {}
	const token = getCookie('token')
	if (token) {
		headers['Authorization'] = `Token ${token}`
	}
	return await fetch(url, {
		headers
	}).then(res => {
		if (!res.ok) {
			const error = new Error('Unauthenticated')
			throw Object.assign(error, { status: res.status })
		}
		return res.json()
	})
}
