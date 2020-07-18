import * as express from 'express'
import * as serverless from 'serverless-http'

import { getClient } from './api'
import { exe } from './main'
import { Request, Response } from './ts/types'

getClient()

const app = express()

app.post('/.netlify/functions/main', (req: Request, res: Response) => {
	exe(req, res).catch(e => {
		res.end(`\n\n@ app.post # index.ts\nErr:\n${JSON.stringify(e, null, 3)}\n\n`)
	})
})

module.exports.handler = serverless(app)
