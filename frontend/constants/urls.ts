// FRONTEND
export const HOME_URL: string = '/'
export const BLOG_URL: string = '/blog'

// AUTH
export const AUTH_URL: string = '/auth'
export const LOGIN_URL: string = `${AUTH_URL}/login`
export const FORGOT_PASSWORD_URL: string = `${AUTH_URL}/forgot-password`
export const RESET_PASSWORD_URL: string = `${AUTH_URL}/reset-password`

// PORTAL
export const PORTAL_URL: string = '/portal'
// BLOG
export const PORTAL_BLOG_URL: string = `${PORTAL_URL}/blog`
export const PORTAL_BLOG_NEW_URL: string = `${PORTAL_BLOG_URL}/new`
export const PORTAL_BLOG_EDIT_URL: string = `${PORTAL_BLOG_URL}/edit`


export const AUTHENTICATED_ROUTES: string[] = [PORTAL_URL, PORTAL_BLOG_NEW_URL]
export const PUBLIC_ROUTES: string[] = [HOME_URL, BLOG_URL]

// API
export const API_VERSION: string = '/api'
export const API_BASE_PATH: string = process.env.NODE_ENV === 'development'
	? `http://localhost:8000${API_VERSION}`
	: `https://troubador-portal.co.uk${API_VERSION}`

export const API_ROOT: string = `http://127.0.0.1:8000${API_VERSION}`

// Blog
export const BLOG_ROOT: string = `${API_ROOT}/blog`

// Accounts
export const ACCOUNTS_ROOT: string = `${API_ROOT}/accounts`
export const GET_USER_ENDPOINT: string = `${ACCOUNTS_ROOT}/get-user/`
export const LOGIN_ENDPOINT: string = `${ACCOUNTS_ROOT}/login/`
export const LOGOUT_ENDPOINT: string = `${ACCOUNTS_ROOT}/logout/`
export const LOGOUT_ALL_ENDPOINT: string = `${ACCOUNTS_ROOT}/logout-all/`
export const FORGOT_PASSWORD_ENDPOINT: string = `${ACCOUNTS_ROOT}/forgot-password/`
export const RESET_PASSWORD_ENDPOINT: string = `${ACCOUNTS_ROOT}/reset-password/`
export const FETCH_TINY_API_KEY_ENDPOINT: string = `${ACCOUNTS_ROOT}/tiny-key`

// Media manager
export const MEDIA_MANAGER_ROOT: string = `${API_ROOT}/media-manager`
export const UPLOAD_TINYMCE_IMAGE_ENDPOINT: string = `${MEDIA_MANAGER_ROOT}/upload-tinymce-image/`
export const IMAGES_VIEWSET_ENDPOINT: string = `${API_ROOT}/images`
export const IMAGES_VIEWSET_LIST_ENDPOINT: string = `${IMAGES_VIEWSET_ENDPOINT}/`
