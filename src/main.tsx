import * as express from 'express'
import * as serverless from 'serverless-http'

const app = express()

app.use(express.urlencoded({ extended: false }))

app.post('/.netlify/functions/main', async (req: any, res: any) => {
	res.end(JSON.stringify(req, null, 3))
})

module.exports = app
module.exports.handler = serverless(app)
