// Add index on Handle - DB

import { db, getSheets } from '../api'
import { MyUserId } from '../ts/const'
import { IAgentDB } from './getAgentDb'
import { sendPushMsg } from './sendPushMsg'

// prettier-ignore
export async function renameAgent(query: string) {

	const split = query.split('=')
	const handle = split[0].split('#rename').join('').trim()
	const realName = split[1].trim()

	const snap = await db.ref('agents')
		.orderByChild('handle')
		.equalTo(handle)
		.once('value')

	if (!snap.exists()) {

		const msg = `handle: ${handle} not found!`

		await sendPushMsg(MyUserId, msg)

		return msg
	}

	else {

		const val = snap.val()
		const userId = Object.keys(val)[0]

		await db.ref(`agents/${userId}`).update({ realName })

		const displayName = (await db.ref(`agents/${userId}/displayName`).once('value')).val()

		const msg = [
			`Ok! Real Name Set,`,
			`${displayName}: ${realName}`
		].join('\n\n')

		await sendPushMsg(MyUserId, msg)

		const agent = Object.values(val)[0] as IAgentDB

		const { range, sheetId } = agent

		if (sheetId) {

			const row = range.split(/[!:]/g)[1].slice(1)

			const sheets = await getSheets()

			await sheets.spreadsheets.values.update({
				range: `main!C${row}`,
				requestBody: {
					values: [[ realName ]]
				},
				spreadsheetId: sheetId,
				valueInputOption: 'USER_ENTERED'
			})
		}

		return msg
	}
}
