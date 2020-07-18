import { db } from '../api'

interface IAgentDB {
	checkIn: boolean
	timestamp: string
}

export async function getAgentDB(username: string): Promise<IAgentDB> {
	const { checkIn, timestamp } = (
		await db.ref(`agents/${username}`).once('value')
	).val()
	return { checkIn, timestamp }
}
