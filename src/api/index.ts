import * as admin from 'firebase-admin'
import { readFileSync } from 'fs'
import { google } from 'googleapis'

import { scopes } from '../ts/const'
import { ISvcKey } from '../ts/types'

const readCredentials = () => {
	try {
		return readFileSync('../json/svckey.json')
	} catch (err) {
		throw new Error(`Error loading svcKey, ErrCode: ${err.code}`)
	}
}

const credentials: ISvcKey = JSON.parse(readCredentials().toString())

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(credentials as admin.ServiceAccount),
		databaseURL: 'https://check-in-out-1595002135072.firebaseio.com/',
	})
}

const auth = new google.auth.JWT(
	credentials.client_email,
	undefined,
	credentials.private_key,
	scopes
)

export const drive = google.drive({ version: 'v3', auth })
export const sheets = google.sheets({ version: 'v4', auth })

export const db = admin.database()
