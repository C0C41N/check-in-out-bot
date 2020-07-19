import { db, getDrive } from '../api'
import { getMonthString, parentFolderId, tempId } from '../ts/const'
import { IDMY, IDriveCreateResp, IInfo } from '../ts/types'

// prettier-ignore
export async function checkDriveStructure(date: string) {
	const [day, month, year] = date.split('/')

	const snap = await db.ref('info').once('value')
	const info: IInfo = snap.val()

	if (info.year.id === false || info.year.value < +year) {

		return await createYear(year, month, day)
	}

	if (info.month.id === false || info.month.value < +month) {

		return await createMonth(month, day, info.year.id as string)
	}

	if (info.day.id === false || info.day.value < +day) {

		return await createTempSheet(day, info.month.id as string)
	}

	return info.day.id as string
}

export async function createYear(year: string, month: string, day: string) {
	const drive = await getDrive()
	const resp = (await drive.files.create({
		requestBody: {
			mimeType: 'application/vnd.google-apps.folder',
			name: year,
			parents: [parentFolderId],
		},
	})) as IDriveCreateResp

	const { id } = resp.data

	const DMY: IDMY = { id, value: +year }

	await db.ref('info/year').set(DMY)

	return createMonth(month, day, id)
}

export async function createMonth(
	month: string,
	day: string,
	parentId: string
) {
	const drive = await getDrive()
	const resp = (await drive.files.create({
		requestBody: {
			mimeType: 'application/vnd.google-apps.folder',
			name: getMonthString(+month),
			parents: [parentId],
		},
	})) as IDriveCreateResp

	const { id } = resp.data

	const DMY: IDMY = { id, value: +month }

	await db.ref('info/month').set(DMY)

	return createTempSheet(day, id)
}

export async function createTempSheet(name: string, parentId: string) {
	const drive = await getDrive()
	const resp = (await drive.files.copy({
		fileId: tempId,
		requestBody: { name, parents: [parentId] },
	})) as IDriveCreateResp

	const { id } = resp.data

	const DMY: IDMY = { id, value: +name }

	await db.ref('info/day').set(DMY)

	return id
}
