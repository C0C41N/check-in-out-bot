import axios from 'axios'

import { CAT, grpMProfUrl } from '../ts/const'
import { UserProfile } from '../ts/types'

export async function getProfile(userId: string, groupId: string): UserProfile {
	try {
		const headers = { Authorization: `Bearer ${CAT}` }
		const res = await axios.get(grpMProfUrl(userId, groupId), { headers })
		return res.data
	} catch (e) {
		console.log(`\n\n@ getProfile\n\nErr:\n\n${JSON.stringify(e, null, 3)}`)
		return undefined
	}
}
