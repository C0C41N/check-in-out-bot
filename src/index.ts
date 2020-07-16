import * as express from 'express'
import * as serverless from 'serverless-http'

import { exe } from './main'
import { Request, Response } from './types'

const app = express()

app.post('/.netlify/functions/main', (req: Request, res: Response) => {
	exe(req, res).catch(e => {
		console.log('ERR#000', e)
	})
})

module.exports.handler = serverless(app)
