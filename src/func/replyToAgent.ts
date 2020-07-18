import axios from 'axios'

import { CAT, replyUrl } from '../ts/const'
import { ITextArray } from '../ts/types'

export async function replyToAgent(replyToken: string, msg: string) {
	const messages: ITextArray = [{ text: msg, type: 'text' }]
	const body = { messages, replyToken }
	const headers = {
		Authorization: `Bearer ${CAT}`,
		'Content-Type': 'application/json',
	}

	try {
		await axios.post(replyUrl, body, { headers })
	} catch (e) {
		console.log(`\n\n@ replyToAgent\n\nErr:\n\n${e}\n\n`)
	}
}
