/*
--- Check If Agent Exists
--- If does'nt
---|--- ReplyToAgent: Not Checked IN
--- If does
---|--- Check SheetId
---|---|--- If false
---|---|---|--- ReplyToAgent: Not Checked IN
---|---|--- If id
---|---|---|--- Store Timestamp
---|---|---|--- ReplyToAgent: Check-Out Successful
---|---|---|--- Enter in Sheet (specific range)
---|---|---|--- set sheetId to false
*/

import { db, getSheets } from '../api'
import { getAgentDB } from './getAgentDb'
import { getProfile, IUserProfile } from './getProfile'
import { getTimestamp } from './getTimestamp'
import { replyToAgent } from './replyToAgent'

// prettier-ignore
export async function checkOut(userId: string, groupId: string, replyToken: string) {

	const agent = await getAgentDB(userId)

	if (agent === false) {

		return await notCheckedIn()
	}

	else {

		const { sheetId } = agent

		if (sheetId === false) {

			return await notCheckedIn()
		}

		else {

			const { date, time } = getTimestamp()
			const { displayName } = await profile()

			const msg = [
				`Check-Out successful!\n`,
				`Name: ${displayName}`,
				`Date: ${date}`,
				`Time: ${time}`
			].join('\n')

			await replyToAgent(replyToken, msg)

			const { range } = agent

			const row = range.split(/[!:]/g)[1].slice(1)

			const sheets = await getSheets()

			await sheets.spreadsheets.values.update({
				range: `main!E${row}:F${row}`,
				requestBody: {
					values: [[ time, date ]]
				},
				spreadsheetId: sheetId,
				valueInputOption: 'USER_ENTERED'
			})

			await db.ref(`agents/${userId}/sheetId`).set(false)

			return msg
		}
	}

	async function notCheckedIn() {

		const { displayName } = await profile()

		const msg = [
			`${displayName},`,
			`You aren't Checked In.`
		].join('\n\n')

		await replyToAgent(replyToken, msg)

		return msg
	}

	async function profile() {

		return await getProfile(userId, groupId) as IUserProfile
	}
}
