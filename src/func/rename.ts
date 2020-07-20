import { db } from '../api'
import { MyUserId } from '../ts/const'
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

		const userId = Object.keys(snap.val())[0]

		await db.ref(`agents/${userId}`).update({ realName })

		const msg = [
			`Ok! Real Name Set,`,
			`${displayName}: ${realName}`
		].join('\n\n')

		await sendPushMsg(MyUserId, msg)

		return msg
	}
}
