import axios from 'axios'

import { db } from '../api'
import { checkOutFormURL } from '../ts/const'
import { Response } from '../ts/types'
import { getAgentDB } from './getAgentDb'
import { getProfile } from './getProfile'
import { getTimestamp } from './getTimestamp'
import { replyToAgent } from './replyToAgent'

export async function checkOut(
	userId: string,
	groupId: string,
	res: Response,
	replyToken: string
) {
	const profile = await getProfile(userId, groupId)
	if (!profile) return
	const username = profile.displayName

	const timestamp = getTimestamp()

	const agent = await getAgentDB(username)

	const msg = agent.checkIn
		? `${username}, Check-Out successful @ ${timestamp}`
		: `${username}, You aren't Checked-In.`

	await replyToAgent(replyToken, msg)

	if (agent.checkIn) {
		await Promise.all([
			axios.get(checkOutFormURL(username, agent.timestamp.toString())),
			db.ref(`agents/${username}`).update({ checkIn: false }),
		])
	}

	res.end(msg)
}
