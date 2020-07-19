import { db } from '../api'

export interface IAgentDB {
	displayName: string | boolean
	realName: string | boolean
	sheetId: string | boolean
	range: string | boolean
}

export async function getAgentDB(userId: string): Promise<IAgentDB | false> {
	const snap = await db.ref(`agents/${userId}`).once('value')
	if (!snap.exists()) return false
	return snap.val()
}
