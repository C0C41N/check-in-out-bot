import * as express from 'express'
import * as serverless from 'serverless-http'

import { Request, Response } from 'express'

const app = express()

app.use(express.raw())

app.post('/.netlify/functions/main', async (req: Request, res: Response) => {
	const body = req.body

	console.log(JSON.stringify(body, null, 3))
	res.end(JSON.stringify(body, null, 3))
})

module.exports.handler = serverless(app)
