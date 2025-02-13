import dotenv from 'dotenv'
import process from 'process'
import path from 'path'

/**
 * Load the configuration file based on the environment
 */
export const loadConfig = () => {
    const env = process.env.NODE_ENV ?? 'development'
    const filepath = path.join(process.cwd(), `.env.${env}`)
    dotenv.config({ path: filepath })
}
