export const CAT =
	'pki/jJRfZwYD9Mo92vBea5KNIb6lCFzx/JFbmZpapE3ISzmGZVC1h/xkkONEDbvPpFOic0ousUX06/Iw2Ynq6NQo1ku7vL7HSuS4tzO0y1c53DFobDNzIhvFTHjHnmoFALXGNoltBt54YYS6C0q8VAdB04t89/1O/w1cDnyilFU='

export const checkInFormURL = (username: string) =>
	'https://docs.google.com/forms/d/e/1FAIpQLSd9riW_EgO_hO5gt_hb6BheQzUCLh7C93kyW7JtulLitdPckw/formResponse?entry.501517375=#USERNAME'.replace(
		'#USERNAME',
		username
	)

export const checkOutFormURL = (username: string, timestamp: string) =>
	'https://docs.google.com/forms/d/e/1FAIpQLSf_QE4O7Ke6A9V76epEXwWFY53BQ-qcNPxz7J7S2gukvYemIA/formResponse?entry.1781702975=#USERNAME&entry.12615492=#TIMESTAMP'
		.replace('#USERNAME', username)
		.replace('#TIMESTAMP', timestamp)

export const scopes = [
	'https://www.googleapis.com/auth/drive',
	'https://www.googleapis.com/auth/spreadsheets',
]

export const grpMProfUrl = (userId: string, groupId: string) =>
	'https://api.line.me/v2/bot/group/{groupId}/member/{userId}'
		.replace('{userId}', userId)
		.replace('{groupId}', groupId)

export const replyUrl = 'https://api.line.me/v2/bot/message/reply'
