import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getStudentsRequest } from '../api/api';
import { ListLine } from './list-line';
import styles from './list-table.module.css';


export const ListTable = () => {
  const [header, setHeader] = useState([]);
  const [users, setUsers] = useState(null);
  const location = useLocation();
  useEffect(() => {
    if(location.pathname === '/students') {
      setHeader(['Номер когорты', 'E-mail', 'Имя и фамилия студента']);
    }
    if(location.pathname === '/comments') {
      setHeader(['Когорта', 'Дата', 'Отправитель', 'Получатель', 'Откуда комментарий', 'Текст комментария']);
    }
  }, [header.length])
  
  debugger
  return (
    <section className={styles.container}>
      {header?.length && 
      (
        <table className={styles.table}>
        <thead >
          <tr >
            {header.map(title =>
              <th className={styles.header} key={title}>{title}</th>
            )}
            {location.pathname === '/comments' &&
              <th className={styles.header} key='button'></th>
            }
          </tr>
        </thead>

        <tbody>
          <ListLine />
        </tbody>
      </table>

      )}
      
    </section>
  )
}