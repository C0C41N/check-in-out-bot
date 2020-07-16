import { ToCheckIn, ToCheckOut } from './func'
import { IDirectText, Request, Response } from './types'

export async function exe(req: Request, res: Response) {
	const body: IDirectText = JSON.parse(req.body.toString().replace(/\\/g, ''))

	body.events.forEach(async e => {
		const { replyToken, type } = e
		const { userId } = e.source
		const { text, type: msgType } = e.message

		if (type === 'message' && msgType === 'text') {
			const textL = text.toLowerCase()

			const hasCheckIn: boolean = textL.includes('#checkin')
			const hasCheckOut: boolean = textL.includes('#checkout')

			if (hasCheckIn) {
				ToCheckIn(userId, res, replyToken, true)
			} else if (hasCheckOut) {
				ToCheckOut(userId, res, true)
			} else {
				res.end('TRR#000')
			}
		} else {
			res.end('TRR#001')
		}
	})
}
