import { prisma } from '../common/services/database.service'
import { IUrl } from './url.dto'
import shortid from 'shortid'

const generateShortUrl = (url: string) => {
    return shortid.generate();
}

/**
 * Database query to shorten a url, if it doesn't already exist in database
 * @param data - url data
 * @returns shortened url
 */
export const shortenUrl = async (data: IUrl) => {
    // check if url already exists
    const existingUrl = await prisma.url.findFirst({
        where: {
            originalUrl: data.originalUrl,
        },
    })

    if (existingUrl) {
        return existingUrl
    }

    const result = await prisma.url.create({
        data: {
            ...data,
            shortUrl: generateShortUrl(data.originalUrl),
        },
    })
    return result
}

/**
 * Database query to find a short URL
 * @param shortUrl A short URL
 * @returns original URL, if found (else throws an error)
 */
export const findShortUrl = async (shortUrl: string) => {
    const result = await prisma.url.findUnique({
        where: {
            shortUrl,
        },
    })

    return result
}

/**
 * Database query to update click analytics and return original URL
 * @param shortUrl A short URL
 * @returns original URL, if found (else throws an error)
 */
export const redirectUrl = async (
    urlId: string,
    ip: string,
    userAgent: string,
    location: string
) => {
    // update clickAnalytics and increment click count
    const result = await prisma.url.update({
        where: {
            id: urlId,
        },
        data: {
            clickCount: {
                increment: 1,
            },
            clickAnalytics: {
                create: {
                    ip,
                    userAgent,
                    location,
                },
            },
        },
    })
    return result;
}

/**
 * Database query to get stats of a URL
 * @param shortUrl A short URL
 * @returns stats of a URL
 */
export const urlStats = async (shortUrl: string) => {
    // fetch url and populate clickAnalytics
    const url = await prisma.url.findUnique({
        where: {
            shortUrl,
        },
        include: {
            clickAnalytics: true,
        },
    })

    if (!url) {
        throw new Error('URL not found')
    }

    // if found, return stats for url
    const result = {
        originalUrl: url.originalUrl,
        shortUrl: url.shortUrl,
        clickCount: url.clickCount,
        clickAnalytics: url.clickAnalytics,
    }

    return result
}
