import * as express from 'express'

export type Request = express.Request
export type Response = express.Response

export type ITextArray = IText[]

export interface IGroupText {
	events: [
		{
			type: 'message'
			replyToken: string
			source: {
				userId: string
				groupId: string
				type: 'group'
			}
			timestamp: number
			mode: 'active' | 'standby'
			message: {
				type: 'text'
				id: string
				text: string
			}
		}
	]
	destination: string
}

export interface IDirectText {
	events: [
		{
			type: 'message'
			replyToken: string
			source: {
				userId: string
				type: 'user'
			}
			timestamp: number
			mode: 'active' | 'standby'
			message: {
				type: 'text'
				id: string
				text: string
			}
		}
	]
	destination: string
}

export interface IUserProfile {
	displayName: string
	userId: string
	pictureUrl: string
	statusMessage?: string
}

export interface IText {
	type: 'text'
	text: string
}

export interface ISvcKey {
	type: string
	project_id: string
	private_key_id: string
	private_key: string
	client_email: string
	client_id: string
	auth_uri: string
	token_uri: string
	auth_provider_x509_cert_url: string
	client_x509_cert_url: string
}
