import React, { useContext } from 'react';
import classes from './ContentPreview.module.css';
import pdfImg from '../../Icons/pdfImg.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import editImg from '../../Icons/edit.png';
import deleteImg from '../../Icons/delete.png';
import { userContext } from '../../general/userContext';

export const ContentPreview = ({ files, onDelete }) => {
	const { user } = useContext(userContext);
	const navigate = useNavigate();

	const RenderContent = ({ file }) => {
		switch (file.contentKind) {
			case 'תמונה':
				return (
					<>
						<img src={file.fileLink} alt={file.contentName} />
						<Link to={file.fileLink} target='_blank' download>
							הורד תמונה
						</Link>
					</>
				);

			case 'סרטון':
				return (
					<video className={classes.video} controls>
						<source src={file.fileLink} type='video/mp4' />
					</video>
				);
			case 'מסמך':
				return (
					<>
						<img src={pdfImg} alt={file.contentName} />
						<Link to={file.fileLink} target='_blank' download>
							הורד קובץ
						</Link>
					</>
				);
			default:
				return null;
		}
	};

	const onAddFeedback = ({ contentName }) => {
		navigate('/home/add-feedback', { state: contentName });
	};

	return (
		<div className={classes.contentPreview}>
			{files.map((file, index) => {
				console.log(file);

				return (
					<div key={index} className={classes.contentItem}>
						{user.job === 'הורה' && (
							<button
								className={classes.btnEdit}
								title='הוסף משוב'
								onClick={() => onAddFeedback(file)}
							>
								<img src={editImg} alt='ערוך' />
							</button>
						)}
						{user.job === 'יועצת פדגוגית' && (
							<button className={classes.btnEdit} title='מחיקה' onClick={() => onDelete(file._id)}>
								<img src={deleteImg} alt='מחיקה' />
							</button>
						)}

						<h2> {file.contentName} </h2>
						<RenderContent file={file} />
					</div>
				);
			})}
		</div>
	);
};
