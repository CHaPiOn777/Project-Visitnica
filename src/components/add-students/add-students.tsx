import { ChangeEvent, useRef } from 'react';
import PurpleBtn from '../btn/btn';
import styles from './add-students.module.css';
import { read, utils, WorkBook } from 'xlsx';
import { putStudentInfoRequest, postStudentRequest, getStudentsRequest } from '../../services/utils/api/admin-students';
import { TRawUser, TStudent } from '../../services/utils/types';


export function AddStudents({users, setUsers}: {users: Array<TStudent>, setUsers: (users: Array<TStudent>) => void}) {
  const ref = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (ref && ref.current) {
      ref.current.click();
    }
  }

  function to_json(workbook: WorkBook) {
		let result: Array<TRawUser> | undefined; //
		workbook.SheetNames.forEach(sheetName => {
			const roa = utils.sheet_to_json<TRawUser>(workbook.Sheets[sheetName]);
			if(roa.length) result = roa;
		});
		return result;
	};

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if(e.target.files) { 
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = function(e) {
        const data =  e.target && e.target.result;
        const workbook = read(data);
        const res = to_json(workbook);

        res && res.forEach(el => {
          const updatedUser = users.find(u => u.email === el.email && el.cohort !== u.cohort);
          const newUser = users.find(u => u.email !== el.email && el.cohort !== u.cohort) && !updatedUser;

          if(updatedUser && updatedUser.name && updatedUser.email) {
              const userInfo = {
                id: updatedUser._id,
                name: updatedUser.name,
                cohort: el.cohort,
                email: updatedUser.email
              }
              putStudentInfoRequest(userInfo)
          }
          else if (newUser) {
            postStudentRequest(el)
          }
        });
      };
      reader.readAsArrayBuffer(file);
      
      getStudentsRequest({})
        .then(res => setUsers(res.items))
    }
  }

  return (
    <div className={styles.container}>
      <p className={styles.title}>Добавить студентов</p>
      <p className={styles.par}>Чтобы добавить новых студентов, загрузите csv или xlsx файл: первая колонка должна содержать email студентов, вторая колонка — номер когорты.</p>
      <input type='file' style={{ display: 'none' }} accept='.xlsx,.csv' ref={ref} onChange={e => handleChange(e)}/>
      <PurpleBtn 
        text='Выберите файл'
        size='s'
        onClick={handleClick}
      />
    </div>
  )
}