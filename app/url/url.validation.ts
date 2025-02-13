import { body, checkExact, param } from 'express-validator'

/**
 * user must send originalUrl and expiresAt in request body
 */
export const shortenUrl = checkExact([
    body('originalUrl').isURL().withMessage('Invalid URL'),
    body('expiresAt').isString(),
])

/**
 * user must send shortUrl in request param
 */
export const redirectUrl = checkExact([
    param('shortUrl').isString().withMessage('Invalid short URL'),
])

/**
 * user must send shortUrl in request param
 */
export const statUrl = checkExact([
    param('shortUrl').isString().withMessage('Invalid short URL'),
])
