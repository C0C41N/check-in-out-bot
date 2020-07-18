const options = { hour12: false, timeZone: 'Asia/Bangkok' }

export const getTimestamp = () => new Date().toLocaleString('en-GB', options)
