import * as express from 'express'

export type Request = express.Request
export type Response = express.Response

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
