import * as express from 'express'
import * as serverless from 'serverless-http'

import { getProfile } from './func'
import { IDirectText, Request, Response } from './types'

const app = express()

app.post('/.netlify/functions/main', async (req: Request, res: Response) => {
	const body: IDirectText = JSON.parse(req.body.toString().replace(/\\/g, ''))

	body.events.forEach(async e => {
		if (e.source.type === 'user') {
			const profile = await getProfile(e.source.userId)
			if (typeof profile !== undefined) {
				const out = JSON.stringify(profile, null, 3)
				console.log(out)
				res.send(out)
			}
		}
	})
})

module.exports.handler = serverless(app)
