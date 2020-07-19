/*
	--- Check if user exists in DB
	--- If doesn't
	---|--- Add to DB //
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

import { getSheets } from '../api'
import { checkDriveStructure } from './checkDriveStructure'
import { getAgentDB } from './getAgentDb'
import { getProfile, IUserProfile } from './getProfile'
import { getTimestamp } from './getTimestamp'
import { replyToAgent } from './replyToAgent'

// prettier-ignore
export async function checkIn(userId: string, groupId: string, replyToken: string) {

	let profile: IUserProfile
	const agent = await getAgentDB(userId)

	if (agent === false) {
		await doCheckIn()
	}

	else {

		if (agent.sheetId) {

			const { displayName } = await Profile()

			replyToAgent(replyToken, `${displayName},\n\nYou're already Checked In.`)
		}

		else {
			await doCheckIn()
		}
	}

	async function doCheckIn() {

		const { date, time } = getTimestamp()

		const { displayName } = await Profile()

		replyToAgent(replyToken, [
			`Check-In successful!\n`,
			`Name: ${displayName}`,
			`Date: ${date}`,
			`Time: ${time}`
		].join('\n'))

		const sheetId = await checkDriveStructure(date)

		const drive = await getSheets()
	}

	async function Profile() {

		if (profile) return profile

		profile = await getProfile(userId, groupId) as IUserProfile
		return profile
	}
}
