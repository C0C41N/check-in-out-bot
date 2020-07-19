import { checkIn } from './func/checkIn'
import { IGroupText, Request, Response } from './ts/types'

// prettier-ignore
export async function exe(req: Request, res: Response) {

	const parseBody = () => {

		try {

			return JSON.parse(req.body.toString().replace(/\\/g, ''))
		}

		catch (err) {

			res.end(`\n\nParsing Error @ parseBody # main.ts\n\nBody:\n\n${req.body}\n\n`)
			return false
		}
	}

	const body: IGroupText = parseBody()

	if (!body) return

	body.events.forEach(async e => {

		const { replyToken, type } = e
		const { groupId, userId, type: srcType } = e.source
		const { text, type: msgType } = e.message

		if (type === 'message' && srcType === 'group' && msgType === 'text') {

			const hasCheckIn: boolean = text.toLowerCase().includes('#checkin')
			const hasCheckOut: boolean = text.toLowerCase().includes('#checkout')

			if (hasCheckIn) {

				await checkIn(userId, groupId, replyToken)
				res.end('Ok.')
			}

			else if (hasCheckOut) {

				console.log()
			}

			else {

				res.end(`\n\nIgnored..\n\n`)
			}

		}

		else {

			res.end(`\n\nInvalid event @ exe # main.ts\n\n`)
		}
	})
}
