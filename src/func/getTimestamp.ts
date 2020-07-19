import * as moment from 'moment-timezone'

export interface ITimestamp {
	date: string
	time: string
}

export function getTimestamp(): ITimestamp {
	const date = moment().tz('Asia/Bangkok').locale('th').format('l')
	const time = moment().tz('Asia/Bangkok').locale('th').format('LT')
	return { date, time }
}
