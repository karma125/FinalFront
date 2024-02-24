import React, { useEffect } from 'react';
import { Header } from '../../cmps/Header/Header';
import { WorkPlan } from '../WorkPlan/WorkPlan';
import { Routes as NestedRoutes, Route, useLocation } from 'react-router-dom';
import { ViewTask } from '../Tasks/ViewTask/ViewTask';
import { AddTask } from '../Tasks/AddTask/AddTask';
import classes from './Home.module.css';

import alexImg from '../../Icons/alex.png';
import michaelaImg from '../../Icons/michaela.png';
import ligalImg from '../../Icons/ligal.png';
import noaImg from '../../Icons/noa.png';
import noamImg from '../../Icons/noam.png';
import royImg from '../../Icons/roy.png';
import { ParentPanel } from '../ParentPanel/ParentPanel';
import { AddContent } from '../Content/AddContent/AddContent';
import { SearchContent } from '../Content/SearchContent/SearchContent';
import { AddFeedback } from '../ParentPanel/AddFeedback/AddFeedback';
import { ViewFeedback } from '../ParentPanel/ViewFeedback/ViewFeedback';

export const Home = () => {
	const location = useLocation();

	return (
		<div className={classes.home}>
			<Header />
			<NestedRoutes>
				<Route path='/work-plan' element={<WorkPlan />} /> 
				<Route path='/view-task' element={<ViewTask />} />
				<Route path='/add-task' element={<AddTask />} />
				<Route path='/parent-panel' element={<ParentPanel />} />
				<Route path='/add-content' element={<AddContent />} />
				<Route path='/search-content' element={<SearchContent />} />
				<Route path='/add-feedback' element={<AddFeedback />} />
				<Route path='/view-feedback' element={<ViewFeedback />} />
			</NestedRoutes>

			{location?.pathname === '/home' && (
				<div className={classes.imgWrapper}>
					<img src={michaelaImg} alt='michaela kindergarten' />
					<img src={alexImg} alt='alex kindergarten' />
					<img src={noamImg} alt='noam kindergarten' />
					<img src={ligalImg} alt='ligal kindergarten' />
					<img src={noaImg} alt='noa kindergarten' />
					<img src={royImg} alt='roy kindergarten' />
				</div>
			)}
		</div>
	);
};
