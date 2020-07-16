export const CAT =
	'XSwumbU2BSgoSVx9VGm6loq3x/pskr/3YW3UjlC3/XescDFHLDqNWFzpO5kyyo3PpFOic0ousUX06/Iw2Ynq6NQo1ku7vL7HSuS4tzO0y1ecyUDAIMLRuE41ivQdOBF+stCA2X8WF4zzMcNXCUo7sgdB04t89/1O/w1cDnyilFU='

export const CheckInFormURL = (username: string) =>
	'https://docs.google.com/forms/d/e/1FAIpQLSd9riW_EgO_hO5gt_hb6BheQzUCLh7C93kyW7JtulLitdPckw/formResponse?entry.501517375=#USERNAME'.replace(
		'#USERNAME',
		username
	)

export const CheckOutFormURL = (username: string, timestamp: string) =>
	'https://docs.google.com/forms/d/e/1FAIpQLSf_QE4O7Ke6A9V76epEXwWFY53BQ-qcNPxz7J7S2gukvYemIA/formResponse?entry.1781702975=#USERNAME&entry.12615492=#TIMESTAMP'
		.replace('#USERNAME', username)
		.replace('#TIMESTAMP', timestamp)
