import { checkIn, checkOut } from './func'
import { IGroupText, Request, Response } from './types'

export async function exe(req: Request, res: Response) {
	const body: IGroupText = JSON.parse(req.body.toString().replace(/\\/g, ''))

	body.events.forEach(async e => {
		const { replyToken, type } = e
		const { userId, type: srcType } = e.source
		const { text, type: msgType } = e.message

		if (type === 'message' && msgType === 'text' && srcType === 'group') {
			const textL = text.toLowerCase()

			const hasCheckIn: boolean = textL.includes('#checkin')
			const hasCheckOut: boolean = textL.includes('#checkout')

			if (hasCheckIn) {
				checkIn(userId, res, replyToken, true)
			} else if (hasCheckOut) {
				checkOut(userId, res, replyToken, true)
			} else {
				res.end('TRR#000')
			}
		} else {
			res.end('TRR#001')
		}
	})
}
