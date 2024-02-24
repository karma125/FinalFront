import React, { useContext, useState } from 'react';
import classes from './ViewTask.module.css';
import { userContext } from '../../../general/userContext';
import { useEffect } from 'react';
import { getUserTasks, getAllTasks, updateTask } from '../../../fetchCalls/taskCalls';
import { utils } from '../../../general/utils';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export const ViewTask = () => {
	const { user } = useContext(userContext);
	const [taskList, setTaskList] = useState([]);
	const [filteredList, setFilteredList] = useState([]);
	const [filters, setFilters] = useState({ status: '', creationDate: '', deadlineDate: '' });
	const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

	const navigate = useNavigate();

	const onResetForm = () => {
		setFilters({ status: '', creationDate: '', deadlineDate: '' });
	};

	const getTasks = async () => {
		if (!user._id || user.job === 'הורה') return;
		try {
			let tasks =
				user.job === 'יועצת פדגוגית'
					? await getAllTasks()
					: await getUserTasks({ userId: user._id });
			setTaskList(tasks);
			setFilteredList(tasks);
		} catch (error) {
			console.log('couldnt get tasks');
		}
	};

	useEffect(() => {
		getTasks();
	}, [user]);

	useEffect(() => {
		if (!taskList.length) return;

		console.log('taskList', taskList);
		console.log('filters', filters);
		const filterTasks = () => {
			var newList = [];
			taskList.forEach(task => {
				if (
					(filters.status === '' || task.taskStatus === filters.status) &&
					(filters.creationDate === '' ||
						task.creationDate === moment(filters.creationDate).format('DD/MM/YYYY')) &&
					(filters.deadlineDate === '' ||
						task.deadlineDate === moment(filters.deadlineDate).format('DD/MM/YYYY'))
				) {
					newList.push(task);
				}
			});

			setFilteredList(sortList(newList));
		};

		return filterTasks();
	}, [taskList, filters, sortConfig]);

	const onEdit = task => {
		navigate('/home/add-task', { state: { task } });
	};

	const handleSort = key => {
		let direction = 'asc';

		if (sortConfig.key === key && sortConfig.direction === 'asc') {
			direction = 'desc';
		}

		setSortConfig({ key, direction });
	};

	const sortList = list => {
		const sortedTasks = [...list].sort((a, b) => {
			if (sortConfig.key && a[sortConfig.key] && b[sortConfig.key]) {
				if (sortConfig.direction === 'asc') {
					return a[sortConfig.key].localeCompare(b[sortConfig.key]);
				} else {
					return b[sortConfig.key].localeCompare(a[sortConfig.key]);
				}
			}

			return 0;
		});

		return sortedTasks;
	};

	const onComplete = async task => {
		const newTask = JSON.parse(JSON.stringify(task));
		newTask.taskStatus = 'בוצע';
		try {
			await updateTask(newTask);
			getTasks();
		} catch (error) {
			console.log(error);
		}
	};

	const EditBtn = ({ task }) => {
		if (user.job === 'יועצת פדגוגית') {
			return (
				<td className={classes.editTd} onClick={() => onEdit(task)}>
					עריכה
				</td>
			);
		}
		if (task.taskStatus === 'בוצע') {
			return <td></td>;
		}
		if (user.job === 'גננת') {
			return (
				<td className={classes.editTd} onClick={() => onComplete(task)}>
					בוצע
				</td>
			);
		}
	};

	const onExportTable = async () => {
		try {
			utils.exportTable(
				taskList.map(task => {
					const temp = JSON.parse(JSON.stringify(task));
					delete temp.userId;
					delete temp.createdBy;
					return temp;
				}),
				'tasks list'
			);
			console.log('downlading...');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={classes.viewTasks}>
			<h1>צפייה במשימות שלי</h1>
			<table>
				<thead>
					<tr>
						<th onClick={() => handleSort('_id')}>מספר משימה</th>
						<th onClick={() => handleSort('taskName')}>שם</th>
						<th onClick={() => handleSort('taskFor')}>משימה עבור</th>
						<th onClick={() => handleSort('taskStatus')}>האם בוצע</th>
						<th onClick={() => handleSort('taskDetails')}>תיאור משימה</th>
						<th onClick={() => handleSort('deadlineDate')}>תאריך יעד</th>
						<th onClick={() => handleSort('creationDate')}>תאריך הקמה</th>
						<th onClick={() => handleSort('lastUpdateDate')}>תאריך עדכון</th>
					</tr>
				</thead>
				<tbody>
					{filteredList.length > 0 &&
						filteredList.map(task => (
							<tr key={task._id + 'key'}>
								<td>{task._id}</td>
								<td>{task.taskName}</td>
								<td>{task.taskFor}</td>
								<td>{task.taskStatus === 'בוצע' ? 'כן' : 'לא'}</td>
								<td>{task.taskDetails}</td>
								<td>{task.deadlineDate}</td>
								<td>{task.creationDate}</td>
								<td>{task.lastUpdateDate}</td>
								<EditBtn task={task} />
							</tr>
						))}
				</tbody>
			</table>

			<form className={classes.filterWrapper}>
				<h4>סינון טבלה</h4>
				<h5>סינון על פי סטטוס ביצוע </h5>
				<select
					onChange={value => setFilters({ ...filters, status: value.target.value })}
					value={filters.status}
				>
					<option value=''>ללא סינון</option>
					<option value='בוצע'>בוצע</option>
					<option value='לא בוצע'>לא בוצע</option>
				</select>
				<h5>סינון על פי תאריך הקמה </h5>
				<input
					value={filters.creationDate}
					type='date'
					onChange={value =>
						setFilters({
							...filters,
							creationDate: value.target.value,
						})
					}
				/>
				<h5>סינון על פי תאריך יעד</h5>
				<input
					value={filters.deadlineDate}
					type='date'
					onChange={value =>
						setFilters({
							...filters,
							deadlineDate: value.target.value,
						})
					}
				/>
			</form>
			<div className={classes.actionBtns}>
				<button className={classes.btnExport} onClick={onResetForm}>
					נקה סינון
				</button>
				<button className={classes.btnExport} onClick={onExportTable}>
					ייצוא טבלה לאקסל
				</button>
			</div>
		</div>
	);
};
