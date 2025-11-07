/**
 * Base app URL
 */
export const APP_URL = "http://localhost:3000"

// Auth
/**
 * Authentication callback URL
 */
export const AUTH_CALLBACK_URL = `${APP_URL}/callback`

/**
 * Default redirect URL after authenticated user
 */
export const AUTH_DEFAULT_REDIRECT_URL = `/dashboard`

/**
 * Redirect URL for anonymous users who tried to access protected routes
 */
export const AUTH_LOGIN_PAGE_URL = `/auth/login`;

export const AUTH_URLS = ["/auth/login", "/auth/register"];
