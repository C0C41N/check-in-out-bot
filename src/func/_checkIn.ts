/*
	--- Check if user exists in DB
	--- If doesn't
	---|--- Add to DB
	--- Check spreadsheetId
	---|---If false
	---|---|--- Store TimeStamp
	---|---|--- ReplyToAgent: Check IN
	---|---|--- CheckFilesFolders()
	---|---|--- Check IN
	---|---Else
	---|---|--- ReplyToAgent: Already CheckedIN

	//

	--- CheckFilesFolders()
	---|--- Check IF folders and file Exist
	---|---|--- IF doesn't
	---|---|---|--- Make Folders and/or File
	*/

import { getAgentDB } from './getAgentDb'
import { getProfile } from './getProfile'

// prettier-ignore
export async function checkIn(userId: string, groupId: string) {

	const profile = await getProfile(userId, groupId)

	if (profile === false) return

	const { displayName } = profile

	const agent = await getAgentDB(userId)

	if (agent === false) {
		
	}
}
