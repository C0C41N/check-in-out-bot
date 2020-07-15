import Axios from 'axios'

import { CAT } from './const'

export async function getProfile(userId: string): Promise<object | undefined> {
	try {
		const res = await Axios.get(`https://api.line.me/v2/bot/profile/${userId}/`, {
			headers: {
				Authorization: `Bearer ${CAT}`,
			},
		})

		return res.data
	} catch (e) {
		console.log(`Error in getProfile HTTP request: ${e}`)
		return undefined
	}
}
