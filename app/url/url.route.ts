import { Router } from 'express'
import { catchError } from '../common/middleware/catch-error.middleware'
import * as urlController from './url.controller'
import * as urlValidator from './url.validation'

const router = Router()

router
    .post('/shorten', urlValidator.shortenUrl, catchError, urlController.shortenUrl)
    .get('/:shortUrl', urlValidator.redirectUrl, catchError, urlController.redirectUrl)
    .get('/stats/:shortUrl', urlValidator.statUrl, catchError, urlController.urlStats)

export default router
