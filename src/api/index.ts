import * as admin from 'firebase-admin'
import { google } from 'googleapis'

import { scopes, svcKey } from '../ts/const'

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(svcKey as admin.ServiceAccount),
		databaseURL: 'https://check-in-out-1595002135072.firebaseio.com/',
	})
}

const Auth = new google.auth.JWT(
	svcKey.client_email,
	undefined,
	svcKey.private_key,
	scopes
)

const auth = JSON.stringify(Auth)

export const drive = google.drive({ version: 'v3', auth })
export const sheets = google.sheets({ version: 'v4', auth })

export const db = admin.database()
