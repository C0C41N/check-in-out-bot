import { ToCheckIn, ToCheckOut } from './func'
import { IDirectText, Request, Response } from './types'

export async function exe(req: Request, res: Response) {
	const body: IDirectText = JSON.parse(req.body.toString().replace(/\\/g, ''))

	body.events.forEach(async e => {
		const { type, userId } = e.source
		const { text } = e.message

		if (type === 'user') {
			const textL = text.toLowerCase()

			const hasCheckIn: boolean =
				textL.includes('check in') ||
				textL.includes('check-in') ||
				textL.includes('checkin')
			const hasCheckOut: boolean =
				textL.includes('check out') ||
				textL.includes('check-out') ||
				textL.includes('checkout')

			if (hasCheckIn) {
				ToCheckIn(userId, res, true)
			} else if (hasCheckOut) {
				ToCheckOut(userId, res, true)
			} else {
				res.end('TRR#000')
			}
		}
	})
}
