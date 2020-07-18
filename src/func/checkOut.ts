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
	// Get DisplayName
	let username: string

	const profile = await getProfile(userId, groupId)

	if (profile) {
		username = profile.displayName
	} else {
		console.log('ERR#ToCheckOut_001')
		return
	}

	// Check if agent is already checked out
	const check = await getAgentDB(username)
	if (check[0] === false) {
		// Send reply
		const tmp = `${username}, You aren't Checked-In.`
		await replyToAgent(replyToken, tmp)

		// End
		res.end(tmp)
		return
	}

	// Exe
	await Promise.all([
		// Send Form Response
		axios.get(checkOutFormURL(username, check[1].toString())),

		// Set checkIn to false in db
		db.ref(`agents/${username}`).update({ checkIn: false }),
	])

	// Send reply
	const msg = `${username}, Check-Out successful @ ${getTimestamp()}`
	await replyToAgent(replyToken, msg)

	// End
	res.end(msg)
}
