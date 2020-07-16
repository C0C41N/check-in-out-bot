import * as admin from 'firebase-admin'

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(require('./serviceAccount.json')),
		databaseURL: 'https://project-check-in-1594859971508.firebaseio.com',
	})
}

export const db = admin.database()
