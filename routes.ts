/**
 * An Array of routes that are accessible by the public
 * They do not required the authentication
 * @type {String[]}
 */

export const publicRoutes = [
    "/",
    '/auth/new-verification',
    '/auth/new-password',
]

/**
 * An Array of routes that are used for the authentication
 * They will redirect to the /setting page
 * @type {String[]}
 */

export const authRoutes = [
    "/auth/login",
    '/auth/register',
    '/auth/error',
    '/auth/reset',
]

/**
 * The Prefix for API authetication routes
 * Routes that start with this prefix are used for API
 *authetication purpous
 * @type {String}
 */

export const apiAuthPrefix = '/api/auth'

/**
 * defult user redirect after login
 * They will redirect to the /setting page
 * @type {String}
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings'