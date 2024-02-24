import * as XLSXutils from 'xlsx'

function getFormattedDate(dateToFormat = Date.now()) {
	const date = new Date(dateToFormat)

	// Extract day, month, and year
	const day = String(date.getDate()).padStart(2, '0')
	const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
	const year = date.getFullYear()

	// Create the formatted date string
	const formattedDate = `${day}-${month}-${year}`

	return formattedDate
}

function getKinderGardenList() {
	return ['הגן של נועם', 'הגן של רוי', 'הגן של נועה', 'הגן של ליגל', 'הגן של אלכס', 'הגן של מיכאלה']
}
function getKinderGardenMailList() {
	return [{ name: 'הגן של נועם', email: 'noamdoremi@gmail.com' },
	{ name: ' הגן של רוי', email: 'royydoremi@gmail.com' },
	{ name: 'הגן של נועה', email: 'Noaadoremi@gmail.com' },
	{ name: 'הגן של ליגל', email: 'ligalldoremi@gmail.com' },
	{ name: 'הגן של אלכס', email: 'alexdoremi1@gmail.com' },
	{ name: 'הגן של מיכאלה', email: 'michaeladoremi@gmail.com' },
	]
}

function exportTable(data, fileName) {
	const ws = XLSXutils.utils.json_to_sheet(data)

	const wb = XLSXutils.utils.book_new()
	XLSXutils.utils.book_append_sheet(wb, ws, 'Sheet 1')

	XLSXutils.writeFile(wb, `${fileName}.xlsx`)
}

function contentKinds() {
	return [
		'ראש השנה',
		'סוכות',
		'חנוכה',
		'פורים',
		'טו בשבט',
		'פסח',
		'שבועות',
		'שירי בוקר',
		'חורף',
		'קיץ',
		'אביב',
		'סתיו',
		'השתלמות',
		'אחר',
	]
}

export const utils = {
	getFormattedDate,
	getKinderGardenList,
	exportTable,
	contentKinds,
	getKinderGardenMailList
}
