import { loadConfig } from './app/common/helper/config.helper'
import express from 'express'
import http from 'http'
import errorHandler from './app/common/middleware/error-handler.middleware'
// import router from './app/routes'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import router from './app/routes'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from './swagger.json';

loadConfig()
const port = Number(process.env.PORT) ?? 3000

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
app.use(morgan('dev'))
app.use(
    cors({
        origin: '*',
    })
)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

/**
 * Initialize the application
 */
const initApp = async () => {

    app.use('/api', router)

    app.use(errorHandler)

    const httpServer = http.createServer(app)

    httpServer.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}

void initApp()
