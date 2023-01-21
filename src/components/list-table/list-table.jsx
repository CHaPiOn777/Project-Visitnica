import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getCommentsRequest } from '../../services/utils/api/get-comments';
import { getStudentsRequest } from '../../services/utils/api/get-students';
import { ListLine } from './list-line';
import styles from './list-table.module.css';


export const ListTable = ({ header, array, setFunc }) => {
  // const [header, setHeader] = useState([]);
  const location = useLocation();
  // useEffect(() => {
  //   if (location.pathname === '/students') {
  //     setHeader(['Номер когорты', 'E-mail', 'Имя и фамилия студента']);
  //     getStudentsRequest({})
  //       .then(res => setFunc(res.items));
  //   }
  //   if (location.pathname === '/comments') {
  //     setHeader(['Когорта', 'Дата', 'Отправитель', 'Получатель', 'Откуда комментарий', 'Текст комментария']);
  //     getCommentsRequest({})
  //       .then(res => setFunc(res.items));
  //   }
  // }, [header.length, array?.length])

  return (
    array?.length ?
      (
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
                  <ListLine array={array} setFunc={setFunc} />
                </tbody>
              </table>
            )}
        </section>) : (
        <section className={`${styles.container} ${styles.empty}`} >
          Не удалось никого найти. Исправьте запрос или сбросьте фильтр
        </section>
      )
  )



  if (!array?.length) {
    return (
      <section className={`${styles.container} ${styles.empty}`} >
        Не удалось никого найти. Исправьте запрос или сбросьте фильтр
      </section>
    )
  }

}