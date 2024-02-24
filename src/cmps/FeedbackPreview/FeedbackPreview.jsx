import React from 'react';
import classes from './FeedbackPreview.module.css';
import pdfImg from '../../Icons/pdfImg.jpeg';
import { Link } from 'react-router-dom';

export const FeedbackPreview = ({ feedbacks }) => {
	const RenderFeedback = ({ file }) => {
		const fileEnding = file.fileName.split('.').at(-1);
		const type = fileEnding === 'pdf' ? 'file' : 'image';

		switch (type) {
			case 'image':
				return (
					<>
						<img src={file.fileLink} alt={file.feedbackName} />
						<Link to={file.fileLink} target='_blank' download>
							הורד תמונה
						</Link>
					</>
				);

			case 'file':
				return (
					<>
						<img src={pdfImg} alt={file.feedbackName} />
						<Link to={file.fileLink} target='_blank' download>
							הורד קובץ
						</Link>
					</>
				);
			default:
				return null;
		}
	};

	return (
		<div className={classes.feedbackPreview}>
			{feedbacks.map((feedback, index) => (
				<div key={index} className={classes.feedbackItem}>
					<h2> {feedback.feedbackName} </h2>
					<h3> {feedback.feedbackDesc} </h3>
					<h4> נוסף על ידי {feedback.createdBy.firstName + ' ' + feedback.createdBy.lastName} </h4>
					<RenderFeedback file={feedback} />
				</div>
			))}
		</div>
	);
};
