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

export async function ToCheckIn(
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

	// Add user to db
	AddCheckIn(username, timestamp)

	// Send reply
	ReplyToAgent(replyToken, `${username}, CheckIn successful @ ${timestamp}`)

	// End
	if (end) res.end(`${username} checkedIn!`)
}

export async function AddCheckIn(username: string, timestamp: string) {
	axios.get(CheckInFormURL(username))

	const o = { checkIn: true, timestamp }

	db.ref(`agents/${username}`).set(o)
}

export async function ToCheckOut(userId: string, res: Response, end = false) {
	// Get DisplayName
	let username: string

	const profile = await getProfile(userId)

	if (profile) {
		username = profile.displayName
	} else {
		console.log('ERR#ToCheckIn_001')
		return
	}

	AddCheckOut(username)

	// End
	if (end) res.end(`${username} checkedOut!`)
}

export async function AddCheckOut(username: string) {
	// Get Timestamp from db
	const timestamp = (
		await db.ref(`agents/${username}/timestamp`).once('value')
	).val()

	// Send Form Response
	axios.get(CheckOutFormURL(username, timestamp))

	// Set checkIn to false in db
	db.ref(`agents/${username}`).update({ checkIn: false })
}

export function getTimestamp(): string {
	const options = { hour12: false, timeZone: 'Asia/Bangkok' }

	const now = new Date().toLocaleString('en-GB', options)

	const [date, time] = now.split(', ')
	const [m, d, y] = date.split('/')

	return `${d}/${m}/${y}, ${time}`
}

export function ReplyToAgent(replyToken: string, msg: string) {
	const messages: ITextArray = [{ text: msg, type: 'text' }]

	const body = { messages, replyToken }

	const headers = {
		Authorization: `Bearer ${CAT}`,
		'Content-Type': 'application/json',
	}

	axios.post('https://api.line.me/v2/bot/message/reply', body, { headers })
}
