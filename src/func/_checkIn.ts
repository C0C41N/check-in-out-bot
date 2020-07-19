/*
	--- Check if user exists in DB
	--- If doesn't
	---|--- Add to DB
	--- Check spreadsheetId
	---|---If false
	---|---|--- Store TimeStamp
	---|---|--- ReplyToAgent: Check IN
	---|---|--- CheckFilesFolders()
	---|---|--- Check IN
	---|---Else
	---|---|--- ReplyToAgent: Already CheckedIN

	//

	--- CheckFilesFolders()
	---|--- Check IF folders and file Exist
	---|---|--- IF doesn't
	---|---|---|--- Make Folders and/or File
	*/

export async function checkIn() {}
