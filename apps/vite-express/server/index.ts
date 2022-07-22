import bodyParser from 'body-parser'
import express, { Express, Request, Response } from 'express'
import { clearScreen } from './utils/index'
import color from 'picocolors'
import dotenv from 'dotenv'
import { createServer } from 'vite'
dotenv.config()



async function createBFF () {

    const app: Express = express()
    const port = process.env.STATIC_PORT
    // handle request parameters
    app.use(bodyParser.json({ limit: 1024 * 1024 * 10 }))

    if (process.env.NODE_ENV === 'development') {
        const vite = await createServer({
            server: {
                middlewareMode: true,
            },
        })
        app.use(vite.middlewares)
    } else {
        app.get('/', (_: Request, res: Response) => {
            res.send('Express + TypeScript Server')
        })
    }

    // Node server setup CORS
    app.use('*', (_: Request, res: Response, next) => {
        res.setHeader('Access-Control-Allow-Credentials', 'true')
        res.setHeader('Access-Control-Allow-Headers', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE')
        res.setHeader('Access-Control-Allow-Origin', '*')
        next()
    })

    app.listen(port, async () => {
        clearScreen()
        console.log(color.magenta(`
        ${color.green('➜')} [vite-express] running at: http://localhost:${port}
        ${color.green('➜')}                ${color.cyan('super fast server start~')}
        `))
    })
}

createBFF()