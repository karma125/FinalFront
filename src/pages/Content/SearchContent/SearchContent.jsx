import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getContent, removeContent } from '../../../fetchCalls/contentCalls';
import { ContentPreview } from '../../../cmps/ContentPreview/ContentPreview';
import classes from './SearchContent.module.css';
import { utils } from '../../../general/utils';

export const SearchContent = () => {
	const { handleSubmit, register } = useForm();
	const [content, setContent] = useState([]);
	const [filteredContent, setFilteredContent] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchContent = async () => {
		try {
			setLoading(true);
			let newContent = await getContent();
			setContent(newContent);
			setFilteredContent(newContent);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchContent();
	}, []);

	const onSearch = (data, e) => {
		e.preventDefault();

		var newList = [];
		content.forEach(c => {
			if (
				new RegExp(data.contentName, 'g').test(c.contentName) &&
				(data.contentKind === 'הכל' || c.contentKind === data.contentKind) &&
				(data.contentTag === 'הכל' || c.contentTag === data.contentTag)
			) {
				newList.push(c);
			}
		});

		setFilteredContent(newList);
	};

	const onDelete = async contentId => {
		try {
			setLoading(true);
			await removeContent({ contentId });
			await fetchContent();
		} catch (error) {
			console.log('failed to remove content');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={classes.searchContent}>
			<form onSubmit={handleSubmit(onSearch)}>
				<h1>חיפוש תכנים</h1>

				<div className={classes.formBody}>
					<h3>ניתן לבצע חיפוש של תוכן באמצעות הדרכים הבאות:</h3>

					<div className={classes.formItem}>
						<label>שם תוכן</label>
						<input {...register('contentName')} />
					</div>

					<div className={classes.formItem}>
						<label>תגית</label>
						<select {...register('contentTag')}>
							<option key={-1}>הכל</option>
							{utils.contentKinds().map((kind, index) => (
								<option key={index}>{kind}</option>
							))}
						</select>
					</div>

					<div className={classes.formItem}>
						<label>סוג תוכן</label>
						<select {...register('contentKind')}>
							<option>הכל</option>
							<option>תמונה</option>
							<option>סרטון</option>
							<option>מסמך</option>
						</select>
					</div>

					<button className={classes.searchBtn}>חיפוש</button>
				</div>
			</form>

			{loading ? (
				<p>Loading...</p>
			) : !filteredContent.length ? (
				<p className={classes.txtNotFound}>לא נמצאו תוצאות</p>
			) : (
				<ContentPreview files={filteredContent} onDelete={onDelete} />
			)}
		</div>
	);
};
