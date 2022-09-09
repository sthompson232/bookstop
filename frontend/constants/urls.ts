// FRONTEND
export const HOME_URL: string = '/'
export const LOGIN_URL: string = '/auth/login'
export const BLOG_URL: string = '/blog'
export const AUTHENTICATED_ROUTES: string[] = [BLOG_URL]

// API
export const API_VERSION: string = '/api'
export const API_ROOT: string = `http://127.0.0.1:8000${API_VERSION}`
export const ACCOUNTS_ROOT: string = `${API_ROOT}/accounts`
export const BLOG_ROOT: string = `${API_ROOT}/blog`

// Accounts
export const GET_USER_ENDPOINT: string = `${ACCOUNTS_ROOT}/get-user/`
export const LOGIN_ENDPOINT: string = `${ACCOUNTS_ROOT}/login/`
export const LOGOUT_ENDPOINT: string = `${ACCOUNTS_ROOT}/logout/`
export const LOGOUT_ALL_ENDPOINT: string = `${ACCOUNTS_ROOT}/logout-all/`
