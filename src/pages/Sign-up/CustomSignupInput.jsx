import classes from './Signup.module.css'

const MSGS = {
	NAME: 'שם חייב להכיל אותיות בלבד ולהיות ארוך מ2 תווים',
	EMAIL: 'מייל לא תקין',
	ID: 'תעודת זהות לא תיקנית',
	PW: 'סיסמא חייבת להכיל אות וסיפרה אחת לפחות',
	PW2: 'הסיסמאות חייבות להיות זהות',
	PHONE: 'המספר שהוכנס אינו תקין',
	EMPTY: 'סעיף זה חובה',
}

export const CustomSignupInput = ({
	register,
	name,
	errors,
	hebName,
	validation,
	isRequired,
	msg,
	type,
}) => {
	return (
		<div className={classes.inputWrapper}>
			<input
				type={type}
				{...register(name, {
					...validation,
					required: isRequired,
				})}
				aria-invalid={errors[name] ? 'true' : 'false'}
				aria-required={isRequired}
				data-debug-required={isRequired}
			/>
			<label>{hebName}</label>
			<span className={classes.field}>
				{errors[name]?.type === 'required' ? MSGS.EMPTY : MSGS[msg]}
			</span>
		</div>
	)
}
