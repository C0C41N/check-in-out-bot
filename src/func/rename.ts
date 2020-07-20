import { db, getSheets } from '../api'
import { MyUserId } from '../ts/const'
import { IAgentDB } from './getAgentDb'
import { sendPushMsg } from './sendPushMsg'

// prettier-ignore
export async function renameAgent(query: string) {

	const split = query.split(/[\s]+/g)
	const displayName = split[1]
	const realName = split[3]

	const snap = await db.ref('agents')
		.orderByChild('displayName')
		.equalTo(displayName)
		.once('value')

	if (!snap.exists()) {

		const msg = `displayName: ${displayName} not found!`

		await sendPushMsg(MyUserId, msg)

		return msg
	}

	else {

		const val = snap.val()
		const userId = Object.keys(val)[0]

		await db.ref(`agents/${userId}`).update({ realName })

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
