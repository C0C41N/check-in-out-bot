import { readFileSync, writeFile } from 'fs'
import { google } from 'googleapis'
import { createInterface } from 'readline'

const SCOPES = ['https://www.googleapis.com/auth/drive']
const TOKEN_PATH = __dirname + '/token.json'

interface ICredentials {
	installed: {
		client_id: string
		project_id: string
		auth_uri: string
		token_uri: string
		auth_provider_x509_cert_url: string
		client_secret: string
		redirect_uris: string[]
	}
}

export async function getToken() {
	const readCredentials = () => {
		try {
			return readFileSync('credentials.json')
		} catch (err) {
			throw new Error(`Error loading client secret file, ErrCode: ${err.code}`)
		}
	}

	const credentials: ICredentials = JSON.parse(readCredentials().toString())

	const { client_secret, client_id, redirect_uris } = credentials.installed

	const oAuth2Client = new google.auth.OAuth2(
		client_id,
		client_secret,
		redirect_uris[0]
	)

	// Check if we have previously stored a token.
	const readToken = () => {
		try {
			return readFileSync(TOKEN_PATH)
		} catch (err) {
			return false
		}
	}

	const token = readToken()

	if (token) {
		oAuth2Client.setCredentials(JSON.parse(token.toString()))
		console.log('Ok.')
	}

	// Get Token
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPES,
	})

	console.log('Authorize this app by visiting this url:', authUrl)

	const rl = createInterface({
		input: process.stdin,
		output: process.stdout,
	})

	rl.question('Enter the code from that page here: ', code => {
		rl.close()
		oAuth2Client.getToken(code, (err, token) => {
			if (err) {
				console.error('Error while trying to retrieve access token', err)
				return
			} else if (token === null || token === undefined) {
				console.error('token:', token)
				return
			}

			writeFile(TOKEN_PATH, JSON.stringify(token), err => {
				if (err) {
					console.error(err)
					return
				}

				console.log('Token stored to', TOKEN_PATH)
			})

			oAuth2Client.setCredentials(token)
		})
	})
}
