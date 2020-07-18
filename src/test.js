const fs = require('fs')

const { readFileSync } = fs

const file = () => {
	try {
		return readFileSync('credentials.json')
	} catch (err) {
		throw new Error(`Error loading client secret file, ErrCode: ${err.code}`)
	}
}

console.log(JSON.parse(file().toString()))
