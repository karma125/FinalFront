import React, { useContext, useEffect, useState } from 'react';
import classes from './AddTask.module.css';
import { userContext } from '../../../general/userContext';
import { useForm } from 'react-hook-form';
import { addTask, updateTask } from '../../../fetchCalls/taskCalls';
import { useNavigate, useLocation } from 'react-router-dom';
import moment from 'moment';
import { getTeachers } from '../../../fetchCalls/userCalls';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AddTask = () => {
  const { user } = useContext(userContext);
  const { handleSubmit, register, setValue } = useForm();
  const navigate = useNavigate();
  const todayDate = moment().format('DD/MM/YYYY');
  const location = useLocation();
  const [teacherList, setTeacherList] = useState([]);

  useEffect(() => {
    if (!user || user.job !== 'יועצת פדגוגית') return;

    const getTeacherList = async () => {
      setTeacherList(await getTeachers());
    };

    getTeacherList();
  }, [user]);

  useEffect(() => {
    if (!location.state?.task) {
      return;
    }
    const task = location.state.task;
    Object.entries(task).forEach(([key, value]) => {
      if (key === 'creationDate' || key === 'deadlineDate' || key === 'lastUpdateDate') {
        const formattedDate = moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD');
        setValue(key, formattedDate);
      } else {
        setValue(key, value);
      }
    });
  }, [location, user, setValue]);

  const onSaveTask = async (data, e) => {
    e.preventDefault();
    console.log(data);
    try {
      data.userId = teacherList.find(teacher => data.taskFor === teacher.fullName)._id;
      data.createdBy = user._id;
      data.lastUpdateDate = todayDate;
      data.deadlineDate = moment(data.deadlineDate).format('DD/MM/YYYY');
      data.creationDate = moment(data.creationDate).format('DD/MM/YYYY');

      if (!data._id) {
        data.creationDate = todayDate;
        await addTask(data);
      } else {
        await updateTask(data);
      }
      toast.success('המשימה נשמרה בהצלחה!');
      navigate('/home/view-task');
    } catch (error) {
      console.log('couldnt add task');
      toast.error('שגיאה בשמירת המשימה. אנא נסה שוב.');
    }
  };

  return (
    <div>
      <ToastContainer />
      <form className={classes.addTask} onSubmit={handleSubmit(onSaveTask)}>
        <h1>עדכון/יצירת משימה</h1>
        <div>
          <div className={classes.formItem}>
            <input disabled {...register('_id')} />
            <label>מספר משימה</label>
          </div>
          <div className={classes.formItem}>
            <input {...register('taskName', { required: true })} />
            <label>שם משימה</label>
          </div>
          <div className={classes.formItem}>
            <select {...register('taskFor', { required: true })}>
              {teacherList.map(teacher => (
                <option key={teacher._id}>{teacher.fullName}</option>
              ))}
            </select>

            <label>משימה עבור</label>
          </div>
          <div className={classes.formItem}>
            <select {...register('taskStatus')} defaultValue='לא בוצע'>
              <option>לא בוצע</option>
              <option>בוצע</option>
            </select>
            <label>סטטוס משימה</label>
          </div>
        </div>
        <h2>תיאור משימה</h2>
        <div>
          <label>נא להזין כאן את תיאור המשימה</label>
          <textarea rows={5} {...register('taskDetails')} />
        </div>
        <h2>זמנים</h2>
        <div>
          <div> </div>
          <div className={classes.formItem}>
            <input type='date' {...register('deadlineDate')} />
            <label>יעד משימה</label>
          </div>
          <div className={classes.formItem}>
            <input disabled type='date' {...register('creationDate')} />
            <label>תאריך/זמן יצירה</label>
          </div>
          <div className={classes.formItem}>
            <input disabled type='date' {...register('lastUpdateDate')} />
            <label>עודכן לאחרונה בתאריך</label>
          </div>
          <button className={classes.saveBtn}>שמירה</button>
        </div>
      </form>
    </div>
  );
};
