// FRONTEND
export const HOME_URL: string = '/'
export const BLOG_URL: string = '/blog'

// AUTH
export const AUTH_URL: string = '/auth'
export const LOGIN_URL: string = `${AUTH_URL}/login`
export const FORGOT_PASSWORD_URL: string = `${AUTH_URL}/forgot-password`
export const RESET_PASSWORD_URL: string = `${AUTH_URL}/reset-password`

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
export const FORGOT_PASSWORD_ENDPOINT: string = `${ACCOUNTS_ROOT}/forgot-password/`
export const RESET_PASSWORD_ENDPOINT: string = `${ACCOUNTS_ROOT}/reset-password/`
