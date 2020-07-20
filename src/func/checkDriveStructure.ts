import { db, getDrive } from '../api'
import { getMonthString, parentFolderId, tempId } from '../ts/const'
import { IDMY, IDriveCreateResp, IInfo } from '../ts/types'

// prettier-ignore
export async function checkDriveStructure(date: string) {
	const [, month, year] = date.split('/')

	const snap = await db.ref('info').once('value')
	const info: IInfo = snap.val()

	if (info.year.id === false || info.year.value < +year) {

		return await createYear(year, month)
	}

	if (info.month.id === false || info.month.value < +month) {

		return await createTempSheet(month, info.year.id as string)
	}

	return info.month.id as string
}

export async function createYear(year: string, month: string) {
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

	return createTempSheet(month, id)
}

export async function createTempSheet(month: string, parentId: string) {
	const drive = await getDrive()
	const resp = (await drive.files.copy({
		fileId: tempId,
		requestBody: { name: getMonthString(+month), parents: [parentId] },
	})) as IDriveCreateResp

	const { id } = resp.data

	const DMY: IDMY = { id, value: +month }

	await db.ref('info/month').set(DMY)

	return id
}
