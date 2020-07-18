import axios from 'axios'

import { CAT, CheckInFormURL, CheckOutFormURL } from './const'
import { db } from './db'
import { ITextArray, IUserProfile, Response } from './types'

export async function getProfile(
	userId: string
): Promise<IUserProfile | undefined> {
	try {
		const res = await axios.get(`https://api.line.me/v2/bot/profile/${userId}/`, {
			headers: {
				Authorization: `Bearer ${CAT}`,
			},
		})

		return res.data
	} catch (e) {
		console.log('ERR#001', e)
		return undefined
	}
}

export async function checkIn(
	userId: string,
	res: Response,
	replyToken: string,
	end = false
) {
	// Get DisplayName
	let username: string

	const profile = await getProfile(userId)

	if (profile) {
		username = profile.displayName
	} else {
		console.log('ERR#ToCheckIn_001')
		return
	}

	// Get Timestamp
	const timestamp = getTimestamp()

	// Check if agent is already CheckedIn
	const check = await getAgentDB(username)
	if (check[0] === true) {
		// Send reply
		const tmp = `${username}, You already Checked-In @ ${check[1]}`
		await replyToAgent(replyToken, tmp)

		// End
		if (end) res.end(tmp)
		return
	}

	// Exe
	const o = { checkIn: true, timestamp }

	await Promise.all([
		await axios.get(CheckInFormURL(username)),
		db.ref(`agents/${username}`).set(o),
	])

	// Send reply
	const msg = `${username}, Check-In successful @ ${timestamp}`
	await replyToAgent(replyToken, msg)

	// End
	if (end) res.end(msg)
}

export async function checkOut(
	userId: string,
	res: Response,
	replyToken: string,
	end = false
) {
	// Get DisplayName
	let username: string

	const profile = await getProfile(userId)

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
		if (end) res.end(tmp)
		return
	}

	// Exe
	await Promise.all([
		// Send Form Response
		axios.get(CheckOutFormURL(username, check[1].toString())),

		// Set checkIn to false in db
		db.ref(`agents/${username}`).update({ checkIn: false }),
	])

	// Send reply
	const msg = `${username}, Check-Out successful @ ${getTimestamp()}`
	await replyToAgent(replyToken, msg)

	// End
	if (end) res.end(msg)
}

export function getTimestamp(): string {
	const options = { hour12: false, timeZone: 'Asia/Bangkok' }

	const now = new Date().toLocaleString('en-GB', options)

	return now
}

export async function replyToAgent(replyToken: string, msg: string) {
	const messages: ITextArray = [{ text: msg, type: 'text' }]

	const body = { messages, replyToken }

	const headers = {
		Authorization: `Bearer ${CAT}`,
		'Content-Type': 'application/json',
	}

	try {
		await axios.post('https://api.line.me/v2/bot/message/reply/', body, {
			headers,
		})
	} catch (e) {
		console.log(`ERR#ReplyToAgent@AXIOS: ${e}`)
	}
}

export async function getAgentDB(username: string) {
	const { checkIn, timestamp } = (
		await db.ref(`agents/${username}`).once('value')
	).val()
	return [checkIn, timestamp]
}
