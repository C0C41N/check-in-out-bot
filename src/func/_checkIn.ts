/*
	--- Check if user exists in DB
	--- If doesn't
	---|--- Add to DB //
	--- Check spreadsheetId
	---|---If false
	---|---|--- Store TimeStamp
	---|---|--- ReplyToAgent: Check IN
	---|---|--- CheckFilesFolders()
	---|---|--- Enter Data in sheet
	---|---|--- Enter Data in DB
	---|---Else
	---|---|--- ReplyToAgent: Already CheckedIN

	//

	--- CheckFilesFolders()
	---|--- Check IF folders and file Exist
	---|---|--- IF doesn't
	---|---|---|--- Make Folders and/or File
	*/

import { db, getSheets } from '../api'
import { ISheetAppendResp } from '../ts/types'
import { checkDriveStructure } from './checkDriveStructure'
import { getAgentDB, IAgentDB } from './getAgentDb'
import { getProfile, IUserProfile } from './getProfile'
import { getTimestamp } from './getTimestamp'
import { replyToAgent } from './replyToAgent'

// prettier-ignore
export async function checkIn(userId: string, groupId: string, replyToken: string) {

	const agent = await getAgentDB(userId)

	if (agent === false) {
		await doCheckIn()
	}

	else {

		if (agent.sheetId) {

			const { displayName } = await profile()

			replyToAgent(replyToken, `${displayName},\n\nYou're already Checked In.`)
		}

		else {
			await doCheckIn()
		}
	}

	async function doCheckIn() {

		const { date, time } = getTimestamp()

		const { displayName } = await profile()

		replyToAgent(replyToken, [
			`Check-In successful!\n`,
			`Name: ${displayName}`,
			`Date: ${date}`,
			`Time: ${time}`
		].join('\n'))

		const sheetId = await checkDriveStructure(date)
		const sheets = await getSheets()
		const name = agent && agent.realName ? agent.realName : displayName

		const resp: ISheetAppendResp = await sheets.spreadsheets.values.append({
			range: 'main!B8:F8',
			requestBody: {
				values: [[date, name, time]],
			},
			spreadsheetId: sheetId,
			valueInputOption: 'USER_ENTERED',
		})

		const { updatedRange: range } = resp.updates

		const Agent: IAgentDB = { displayName, range, sheetId }

		db.ref(`agents/${userId}`).update(Agent)
	}

	async function profile() {
		return await getProfile(userId, groupId) as IUserProfile
	}
}
