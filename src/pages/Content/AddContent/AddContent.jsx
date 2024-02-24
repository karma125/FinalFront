import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classes from './AddContent.module.css';
import { utils } from '../../../general/utils';
import { useForm } from 'react-hook-form';
import { addContent } from '../../../fetchCalls/contentCalls';
import { uploadService } from '../../../general/upload';

export const AddContent = () => {
  const { handleSubmit, register, setValue } = useForm();

  const onSaveContent = async (data, e) => {
    e.preventDefault();
    data.contentCreatedAt = new Date();
    try {
      let file = data.file;
      let FileType = file.type.split('/')[1];

      let blob = file.slice(0, file.size, file.type);
      let newFile = new File([blob], `${data.contentName}.${FileType}`);

      data.fileLink = await uploadService.uploadImg(newFile);
      await addContent(data);
      // Show success toast
      toast.success('העלאה בוצעה בהצלחה!');

    } catch (err) {
      console.log('העלאה נכשלה');
      // Show error toast
      toast.error('תקלה! אנא נסה שוב');
    }
  };

  const onUploadingFile = ({ target }) => {
    const file = target.files[0];

    setValue('file', file);
    setValue('contentOriginName', file.name);
    setValue('contentSize', `${(file.size / 1024).toFixed(0)} KB`);
  };

  return (
    <div className={classes.addContent}>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSaveContent)} encType='multipart/form-data'>
        <h1>העלאת תכנים</h1>
        <div className={classes.formBody}>
          <div>
            <label>מספר תוכן</label>
            <input disabled {...register('_id')} />
          </div>
          <div>
            <label>סוג תוכן</label>
            <select {...register('contentKind')}>
              <option>תמונה</option>
              <option>סרטון</option>
              <option>מסמך</option>
            </select>
          </div>
          <div>
            <label>גודל תוכן</label>
            <input disabled {...register('contentSize')} />
          </div>
          <div>
            <label>שם תוכן</label>
            <input {...register('contentName')} />
          </div>
          <div>
            <label>תגיות</label>
            <select {...register('contentTag')}>
              {utils.contentKinds().map((kind, index) => {
                return <option key={index}>{kind}</option>;
              })}
            </select>
          </div>
          <div>
            <label>תאריך/זמן יצירה</label>
            <input disabled {...register('contentCreatedAt')} />
          </div>
          <div>
            <label>העלאת קובץ</label>
            <input
              id='btnSearch'
              type='file'
              hidden
              {...register('file')}
              onChange={onUploadingFile}
            />
            <input disabled type='text' {...register('contentOriginName')} />
            <label htmlFor='btnSearch' className={classes.btnSearch}>
              חיפוש במחשב
            </label>
          </div>
          <button className={classes.btnSave}>שמירה</button>
        </div>
      </form>
    </div>
  );
};
