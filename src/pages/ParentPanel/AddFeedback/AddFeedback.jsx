import classes from './AddFeedback.module.css';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { uploadService } from '../../../general/upload';
import { addFeedback } from '../../../fetchCalls/feedbackCalls';
import { userContext } from '../../../general/userContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';

export const AddFeedback = () => {
	const { handleSubmit, register, setValue } = useForm();
	const { user } = useContext(userContext);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (location.state) {
			setValue('feedbackName', location.state);
		}
	}, []);

	const onSaveFeedback = async (data, e) => {
		e.preventDefault();

		data.feedbackCreatedAt = new Date();
		data.createdBy = user;

		try {
		
			
				let file = data.feedbackFile;
				let FileType = file.type.split('/')[1];

				let blob = file.slice(0, file.size, file.type);
				let newFile = new File([blob], `${data.fileName}.${FileType}`);

				data.fileLink = await uploadService.uploadImg(newFile);
			
			await addFeedback(data);
			console.log('feedback added');
			toast.success('המשוב נוסף בהצלחה!');
			navigate(-1);
		} catch (err) {
			console.log('error! did not add feedback');
			toast.error('שגיאה בהוספת המשוב. אנא נסה שוב.');
		}
	};

	const onUploadFile = ({ target }) => {
		const file = target.files[0];
		setValue('feedbackFile', file);
		setValue('fileName', file.name);
	};

	return (
		<div className={classes.addFeedBack}>
			<ToastContainer />
			<form onSubmit={handleSubmit(onSaveFeedback)}>
				<h2>הוספת משוב לתרגול בבית</h2>
				<div className={classes.formBody}>
					<div className={classes.uploadFileWrapper}>
						<label>העלאת קובץ</label>
						<div>
							<input
								id='uploadFile'
								type='file'
								hidden
								{...register('feedbackFile')}
								onChange={onUploadFile}
							/>
							<input type='text' disabled {...register('fileName')} />
							<label htmlFor='uploadFile' className={classes.labelFindOnCp}>
								חיפוש במחשב
							</label>
						</div>
					</div>
					<h2>תיאור</h2>
					<label>נא להזין כאן את התיאור</label>
					<textarea {...register('feedbackDesc')} />
					<div>
						<label>שם התוכן עליו משיבים</label>
						<input {...register('feedbackName')} />
					</div>
					<div>
						<label>תאריך יצירה</label>
						<input type='date' disabled {...register('feedbackCreatedAt', { value: new Date() })} />
					</div>

					<button className={classes.btnSave}>שמירה</button>
				</div>
			</form>
		</div>
	);
};
