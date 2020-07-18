import * as admin from 'firebase-admin'
import { readFileSync } from 'fs'
import { google } from 'googleapis'

import { scopes } from '../ts/const'
import { ISvcKey } from '../ts/types'

const readCredentials = () => {
	try {
		return readFileSync('./src/json/svckey.json')
	} catch (err) {
		throw new Error(`\n\nError loading svcKey, ErrCode: ${err.code}\n\n`)
	}
}

const credentials: ISvcKey = JSON.parse(readCredentials().toString())

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(credentials as admin.ServiceAccount),
		databaseURL: 'https://check-in-out-1595002135072.firebaseio.com/',
	})
}

const Auth = new google.auth.JWT(
	credentials.client_email,
	undefined,
	credentials.private_key,
	scopes
)

const auth = JSON.stringify(Auth)

export const drive = google.drive({ version: 'v3', auth })
export const sheets = google.sheets({ version: 'v4', auth })

export const db = admin.database()
