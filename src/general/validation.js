export const validation = {
	isEmailValid,
	isStringLengthValid,
	isOnlyLetters,
	isPasswordLengthValid,
	isPasswordStrong,
	isIsraelIDValid,
	isPhoneNumberValid,
	isPW1equelPW2,
}

function isEmailValid(email) {
	return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
}

function isStringLengthValid(string, length) {
	return length <= string.length
}

function isOnlyLetters(string) {
	return /^[a-z\u0590-\u05fe\-*\ *]+$/.test(string, 'i')
}

function isPasswordLengthValid(password) {
	return 8 <= password.length && password.length <= 12
}

function isPasswordStrong(password) {
	return /^(?=.*[0-9])(?=.*[a-zA-Z\u0590-\u05fe])/.test(password)
}

function isIsraelIDValid(id) {
	var id = String(id).trim()
	if (id.length > 9 || isNaN(id)) return false
	id = id.length < 9 ? ('00000000' + id).slice(-9) : id
	return (
		Array.from(id, Number).reduce((counter, digit, i) => {
			const step = digit * ((i % 2) + 1)
			return counter + (step > 9 ? step - 9 : step)
		}) %
		10 ===
		0
	)
}

function isPhoneNumberValid(phone) {
	return /^0?[5-9]\d{8}$/.test(phone);
}


function isPW1equelPW2(pw1, pw2) {
	return pw1 === pw2
}
