import axios from 'axios'

import { CAT, pushUrl } from '../ts/const'
import { ITextArray } from '../ts/types'

// prettier-ignore
export async function sendPushMsg(to: string, msg: string) {

	const messages: ITextArray = [{ text: msg, type: 'text' }]

	const body = { messages, to }

	const headers = {
		Authorization: `Bearer ${CAT}`,
		'Content-Type': 'application/json',
	}

	try {
		await axios.post(pushUrl, body, { headers })
	} catch (e) {
		console.log(`\n\n@ sendPushMsg\n\n${e}\n\n`)
	}
}
