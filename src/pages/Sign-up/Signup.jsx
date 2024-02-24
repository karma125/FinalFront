import React, { useEffect } from 'react';
import classes from './Signup.module.css';
import { LoginSignupHeader } from '../../cmps/LoginSignupHeader/LoginSignupHeader';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { validation } from '../../general/validation';
import { CustomSignupInput } from './CustomSignupInput';
import { signUp } from '../../fetchCalls/authCalls';
import { utils } from '../../general/utils';

export const Signup = () => {
	const {
		control,
		handleSubmit,
		register,
		setValue,
		getValues,
		formState: { errors },
	} = useForm();

	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const { user } = location.state;
		setValue('email', user.email);
	}, []);

	const onSignup = (data, e) => {
		e.preventDefault();

		// data.password = data.PW1;
		// delete data.PW1;
		// delete data.PW2;

		signUp(data).then(
			result => {
				console.log(result);
				navigate('/');
			},
			error => {
				console.log('couldnt sign up');
			}
		);
	};

	return (
		<div className={classes.signupContainer}>
			<LoginSignupHeader />

			<form onSubmit={handleSubmit(onSignup)} className={classes.signupForm}>
				<h2> הרשמה </h2>

				<NavLink to='/'>כבר רשומים? לחצו כאן להתחברות</NavLink>

				<div className={classes.inputWrapper}>
					<select {...register('job')} onChange={() => setValue('kindergartenName', '')}>
						<option>גננת</option>
						<option>יועצת פדגוגית</option>
						<option>הורה</option>
					</select>
					<label> הרשם כ</label>
				</div>

				<CustomSignupInput
					type='text'
					name='firstName'
					hebName='שם פרטי'
					isRequired={true}
					msg={'NAME'}
					register={control.register}
					errors={errors}
					validation={{
						validate: validation.isOnlyLetters,
						minLength: 2,
					}}
				/>

				<CustomSignupInput
					type='text'
					name='lastName'
					hebName='שם משפחה'
					isRequired={true}
					msg={'NAME'}
					register={control.register}
					errors={errors}
					validation={{
						validate: validation.isOnlyLetters,
						minLength: 2,
					}}
				/>

				<CustomSignupInput
					type='text'
					name='id'
					hebName='תעודת זהות'
					isRequired={true}
					msg={'ID'}
					register={control.register}
					errors={errors}
					validation={{
						validate: validation.isIsraelIDValid,
						maxLength: 9,
						minLength: 9,
					}}
				/>

				<CustomSignupInput
					type='email'
					name='email'
					hebName='דואר אלקטרוני'
					isRequired={true}
					msg={'EMAIL'}
					register={control.register}
					errors={errors}
					validation={{
						validate: validation.isEmailValid,
					}}
				/>

				<CustomSignupInput
					type='tel'
					name='phone'
					hebName='טלפון'
					isRequired={false}
					msg={'PHONE'}
					register={control.register}
					errors={errors}
					validation={{
						validate: value => (value ? validation.isPhoneNumberValid(value) : true),
					}}
				/>

				<div className={classes.inputWrapper}>
					<select
						{...register('kindergartenName', { disabled: getValues('job') === 'יועצת פדגוגית' })}
					>
						{[...utils.getKinderGardenList(), ''].map((kinder, index) => {
							return <option key={index}> {kinder} </option>;
						})}
					</select>
					<label>שם הגן</label>
				</div>

				<CustomSignupInput
					type='text'
					name='kidName'
					hebName='שם הילד'
					isRequired={false}
					msg={'NAME'}
					register={control.register}
					errors={errors}
					validation={{
						validate: value => (value ? validation.isOnlyLetters(value) : true),
						minLength: 2,
					}}
				/>

				<p>הרישום יסתיים לאחר אישור מנהל מערכת</p>
				<button>שמירה</button>
			</form>
		</div>
	);
};
