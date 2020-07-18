import { db } from '../api'

interface IAgentDB {
	checkIn: boolean
	timestamp: string
}

export async function getAgentDB(username: string): Promise<IAgentDB> {
	const snap = await db.ref(`agents/${username}`).once('value')
	if (!snap.exists()) {
		return {
			checkIn: false,
			timestamp: '#NA',
		}
	}
	const { checkIn, timestamp } = snap.val()
	return { checkIn, timestamp }
}
