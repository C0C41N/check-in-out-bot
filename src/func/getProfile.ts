import axios from 'axios'

import { CAT, grpMProfUrl } from '../ts/const'

export interface IUserProfile {
	displayName: string
	userId: string
	pictureUrl: string
	statusMessage?: string
}

// prettier-ignore
export async function getProfile(userId: string, groupId: string): Promise<IUserProfile | false> {
	try {

		const headers = { Authorization: `Bearer ${CAT}` }
		const resp = await axios.get(grpMProfUrl(userId, groupId), { headers })

		return resp.data

	} catch (e) {

		console.log(`\n\n@ getProfile\n\n${JSON.stringify(e, null, 3)}`)
		return false
	}
}
