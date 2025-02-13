import { Request, Response } from 'express'
import { createResponse } from '../common/helper/response.helper'
import asyncHandler from 'express-async-handler'
import * as urlService from './url.service'

/**
 * Method to shorten a URL
 * @param req - Request
 * @param res - Response
 * @returns shortened URL
 */
export const shortenUrl = asyncHandler(async (req: Request, res: Response) => {
    // convert yyyy-mm-dd req.body.expiresAt to ISO date
    if (req.body.expiresAt) {
        req.body.expiresAt = new Date(req.body.expiresAt).toISOString();
    }
    const result = await urlService.shortenUrl(req.body)
    res.send(createResponse(result, 'Url created successfully'))
})

/**
 * Method to redirect to original URL, if short URL is available or is not expired
 * @param req - Request
 * @param res - Response
 * @returns redirect to original URL
 */
export const redirectUrl = asyncHandler(async (req: Request, res: Response) => {
    const url = await urlService.findShortUrl(req.params.shortUrl)

    if (!url || (url.expiresAt && new Date() > url.expiresAt)) {
        res.status(404).send('URL not found or expired.')
        return
    }

    const result = await urlService.redirectUrl(
        url.id,
        req.ip || '',
        req.headers['user-agent'] || '',
        Array.isArray(req.headers['x-location']) ? req.headers['x-location'][0] : req.headers['x-location'] || ''
    )
    res.redirect(url.originalUrl)
})

/**
 * Method to get stats of a URL
 * @param req - Request
 * @param res - Response
 * @returns stats of a URL
 */
export const urlStats = asyncHandler(async (req: Request, res: Response) => {
    const result = await urlService.urlStats(req.params.shortUrl)
    res.send(createResponse(result, 'Url stats'))
})
