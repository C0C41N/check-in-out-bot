import { getDrive } from '../api'
import { parentFolderId, tempId } from '../ts/const'

export async function createTempSheet(name: string) {
	const drive = await getDrive()
	const e = await drive.files.copy({
		fileId: tempId,
		requestBody: { name, parents: [parentFolderId] },
	})

	console.log(JSON.stringify(e.data, null, 3) + '\n\n')
}
