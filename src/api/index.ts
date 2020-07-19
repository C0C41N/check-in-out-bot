import * as admin from 'firebase-admin'
import { google } from 'googleapis'

import { scopes, svcKey } from '../ts/const'

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(svcKey as admin.ServiceAccount),
		databaseURL: 'https://check-in-out-1595002135072.firebaseio.com/',
	})
}

export const db = admin.database()

let client: any = false

export async function getClient() {
	const { client_email, private_key } = svcKey
	const credentials = { client_email, private_key }
	client = await google.auth.getClient({ credentials, scopes })
	console.log(`\n\ngetClient Ok.\n\n`)
}

export async function getDrive() {
	if (client === false) await getClient()
	return google.drive({ version: 'v3', auth: client })
}

export async function getSheets() {
	if (client === false) await getClient()
	return google.sheets({ version: 'v4', auth: client })
}
