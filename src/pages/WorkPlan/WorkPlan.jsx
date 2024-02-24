import React from 'react';
import classes from './WorkPlan.module.css';
import { AddPlan } from './AddPlan';

export const WorkPlan = () => {
	return (
		<div className={classes.workPlan}>
			<AddPlan />
		</div>
	);
};
