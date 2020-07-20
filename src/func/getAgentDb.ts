import { db } from '../api'

export interface IAgentDB {
	displayName: string
	realName?: string | false
	sheetId: string | false
	range: string
	handle: string
}

export async function getAgentDB(userId: string): Promise<IAgentDB | false> {
	const snap = await db.ref(`agents/${userId}`).once('value')
	if (!snap.exists()) return false
	return snap.val()
}
