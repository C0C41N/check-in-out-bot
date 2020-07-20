import * as express from 'express'

export type Request = express.Request
export type Response = express.Response

export type ITextArray = IText[]

export interface IDirectText {
	events: [
		{
			type: 'message'
			replyToken: string
			source: {
				userId: string
				groupId: string
				type: 'user' | 'group'
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

export interface IText {
	type: 'text'
	text: string
}

export interface IInfo {
	month: IDMY
	year: IDMY
}

export interface IDMY {
	id: boolean | string
	value: number
}

export interface IDriveCreateResp {
	data: {
		kind: 'drive#file'
		id: string
		name: string
		mimeType: 'application/vnd.google-apps.folder'
	}
}

export interface ISheetAppendResp {
	data: {
		spreadsheetId: string
		tableRange: string
		updates: {
			spreadsheetId: string
			updatedRange: string
			updatedRows: number
			updatedColumns: number
			updatedCells: number
		}
	}
}
