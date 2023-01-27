import { ChangeEvent, useRef, useState } from 'react';
import PurpleBtn from '../btn/btn';
import styles from './add-students.module.css';
import { read, utils, WorkBook } from 'xlsx';
import { putStudentInfoRequest, postStudentRequest, getStudentsRequest } from '../../services/utils/api/admin-students';
import { TRawUser, TStudent } from '../../services/utils/types';

type TAddStudentsProps = {
  users: Array<TStudent>, 
  setUsers: (users: Array<TStudent>) => void, 
  addedUsers: Array<TRawUser>,
  setAddedUsers: (users: Array<TRawUser>) => void,
}

export function AddStudents({users, setUsers, addedUsers, setAddedUsers}: TAddStudentsProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [ visible, setVisible ] = useState(false);

  const handleClick = () => {
    if (ref && ref.current) {
      ref.current.click();
    }
  }

  function to_json(workbook: WorkBook) {
		let result: Array<TRawUser> | undefined;
		workbook.SheetNames.forEach(sheetName => {
			const roa = utils.sheet_to_json<TRawUser>(workbook.Sheets[sheetName]);
			if(roa.length) result = roa;
		});
		return result;
	};

  const getInfo = (func: (res: TRawUser[]) => void) => {
    if(ref && ref.current && ref.current.files) {
      const file = ref.current.files[0];
      const reader = new FileReader();
      reader.onload = function(e) {
        const data =  e.target && e.target.result;
        const workbook = read(data);
        const res = to_json(workbook);
        res && func(res);
      }
      reader.readAsArrayBuffer(file);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault(); 
    getInfo(setAddedUsers);
    setVisible(true);
  }

  const handleDelete = () => {
    setAddedUsers([]);
    setVisible(false);
  }

  const handleRequest = (res: Array<TRawUser>) => {
    res && res.forEach(el => {
      const updatedUser = users.find(u => u.email === el.email && el.cohort !== u.cohort);
      const newUser = users.find(u => u.email !== el.email) && !updatedUser;

      if(updatedUser && updatedUser.name && updatedUser.email) {
          const userInfo = {
            id: updatedUser._id,
            name: updatedUser.name,
            cohort: el.cohort,
            email: updatedUser.email
          }
          putStudentInfoRequest(userInfo)
            .catch((err) => {
              console.error(`Ошибка загрузки данных студентов: ${err}`);
            });
      }
      else if (newUser) {
        postStudentRequest(el)
          .catch((err) => {
            console.error(`Ошибка загрузки данных студентов: ${err}`);
          });
      }
    });

    getStudentsRequest({})
      .then(res => {
        setUsers(res.items);
        setAddedUsers([]);
        setVisible(false);
      })
      .catch((err) => {
        console.error(`Ошибка загрузки данных студентов: ${err}`);
      });
  }

  const handleSave = () => {
    ref && ref.current && getInfo(handleRequest);
  }

  return (
    <div className={styles.container}>
      <div>
        <p className={styles.title}>Добавить студентов</p>
        <p className={styles.par}>Чтобы добавить новых студентов, загрузите csv или xlsx файл: первая колонка должна содержать email студентов, вторая колонка — номер когорты.</p>
        <input type='file' style={{ display: 'none' }} accept='.xlsx,.csv' ref={ref} onChange={e => handleChange(e)}/>
        <PurpleBtn 
          text='Выберите файл'
          size='s'
          onClick={handleClick}
        />
      </div>
      {
        visible &&
        <div>
          <p className={styles.par}>Проверьте, что загруженные данные корректны и сохраните их или удалите и загрузите заново.</p>
          <button className={styles.btn_red} onClick={handleDelete}>Удалить</button>
          <button className={styles.btn_blue} onClick={handleSave}>Сохранить</button>
        </div>
      }
    </div>
  )
}