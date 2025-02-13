import { body, checkExact, param } from 'express-validator'

export const shortenUrl = checkExact([
    body('originalUrl').isURL().withMessage('Invalid URL'),
    body('expiresAt').isString(),
])

export const redirectUrl = checkExact([
    param('shortUrl').isString().withMessage('Invalid short URL'),
])

export const statUrl = checkExact([
    param('shortUrl').isString().withMessage('Invalid short URL'),
])
