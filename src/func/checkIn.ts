import axios from 'axios'

import { db } from '../api'
import { checkInFormURL } from '../ts/const'
import { Response } from '../ts/types'
import { getAgentDB } from './getAgentDb'
import { getProfile } from './getProfile'
import { getTimestamp } from './getTimestamp'
import { replyToAgent } from './replyToAgent'

export async function checkIn(
	userId: string,
	groupId: string,
	res: Response,
	replyToken: string
) {
	const profile = await getProfile(userId, groupId) // Get DisplayName
	if (!profile) return
	const username = profile.displayName

	const timestamp = getTimestamp() // Get Timestamp

	const agent = await getAgentDB(username) // Check CheckedIn status

	const msg = agent.checkIn
		? `${username}, You already Checked-In @ ${agent.timestamp}`
		: `${username}, Check-In successful @ ${timestamp}`

	if (!agent.checkIn) {
		await Promise.all([
			axios.get(checkInFormURL(username)),
			db.ref(`agents/${username}`).set({ checkIn: true, timestamp }),
		])
	}

	await replyToAgent(replyToken, msg)
	res.end(msg) // End
}
