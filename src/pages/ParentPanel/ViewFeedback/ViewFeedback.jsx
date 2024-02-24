import { FeedbackPreview } from '../../../cmps/FeedbackPreview/FeedbackPreview';
import { getFeedback } from '../../../fetchCalls/feedbackCalls';
import { userContext } from '../../../general/userContext';
import classes from './ViewFeedback.module.css';
import React, { useContext, useEffect, useState } from 'react';

export const ViewFeedback = () => {
	const [gartenfeedbacks, setFeedbacks] = useState([]);
	const { user } = useContext(userContext)

	useEffect(() => {
		const fetchFeedbacks = async () => {
			setFeedbacks(await getFeedback({ kindergartenName: user.kindergartenName }));
		};
		fetchFeedbacks();
	}, []);

	return (
		<div className={classes.viewFeedBack}>
			<h1>צפייה במשובים </h1>
			{gartenfeedbacks.length > 0 && <FeedbackPreview feedbacks={gartenfeedbacks} />}
		</div>
	);
};
