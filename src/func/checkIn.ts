import { db, getSheets } from '../api';
import { MyUserId } from '../ts/const';
import { ISheetAppendResp } from '../ts/types';
import { checkDriveStructure } from './checkDriveStructure';
import { getAgentDB, IAgentDB } from './getAgentDb';
import { getProfile, IUserProfile } from './getProfile';
import { getRandomNumber } from './getRandomKey';
import { getTimestamp } from './getTimestamp';
import { replyToAgent } from './replyToAgent';
import { sendPushMsg } from './sendPushMsg';

// prettier-ignore
export async function checkIn(userId: string, groupId: string, replyToken: string) {

	// const agent = await getAgentDB(userId)

	// if (agent === false) {

	// 	return await doCheckIn()
	// }

	// else {

	// 	if (agent.sheetId) {

	// 		const { displayName } = await profile()

	// 		const msg = `${displayName},\n\nYou're already Checked In.`

	// 		await replyToAgent(replyToken, msg)

	// 		return msg
	// 	}

	// 	else {
	// 		return await doCheckIn()
	// 	}
	// }

	// async function doCheckIn() {

	// 	const { date, time } = getTimestamp()

	// 	const { displayName } = await profile()

	// 	const msg = [
	// 		`Check-In successful!\n`,
	// 		`Name: ${displayName}`,
	// 		`Date: ${date}`,
	// 		`Time: ${time}`
	// 	].join('\n')

	// 	await replyToAgent(replyToken, msg)

	// 	const sheetId = await checkDriveStructure(date)
	// 	const sheets = await getSheets()
	// 	const name = agent && agent.realName ? agent.realName : displayName

	// 	const resp = await sheets.spreadsheets.values.append({
	// 		range: 'main!B8:F8',
	// 		requestBody: {
	// 			values: [[ date, name, time ]],
	// 		},
	// 		spreadsheetId: sheetId,
	// 		valueInputOption: 'USER_ENTERED',
	// 	}) as ISheetAppendResp

	// 	const { updatedRange: range } = resp.data.updates

	// 	const Agent: IAgentDB = { displayName, range, sheetId }

	// 	let msg2

	// 	if (!(agent && agent.handle)) {
	// 		const handle = getRandomNumber(4)
	// 		Agent.handle = handle

	// 		msg2 = [
	// 			`Agent First-time Check-IN\n`,
	// 			`Name: ${displayName}`,
	// 			`Time: ${time}\n`,
	// 			`HANDLE: ${handle}\n`,
	// 			`Please enter real name for this agent\n`,
	// 			`reply like this: #rename HANDLE = REAL NAME`,
	// 		].join('\n')

	// 		await sendPushMsg(MyUserId, msg2)
	// 	}

	// 	await db.ref(`agents/${userId}`).update(Agent)

	// 	return `${msg}\n\n			---			\n\n${msg2}`
	// }

	// async function profile() {

	// 	return await getProfile(userId, groupId) as IUserProfile
	// }
}
