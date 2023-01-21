import styles from './list-line.module.css'
import deletePic from './../../images/delete.svg';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { getStudentsRequest } from '../../services/utils/api/get-students';
import { deletecommentRequest, getCommentsRequest } from '../../services/utils/api/admin-comments';

// компонент универсальный, в зависимости от роута заполняет таблицу данными
// принимает массив данных (студентов или сообщений) и 
// функцию изменения массива (переданы из компонентов страниц setStudents или setComments)
export const ListLine = ({ array, setFunc }) => {
  const location = useLocation();
  const deleteHandler = (id, index) => {
    deletecommentRequest(id)
    .then(res=> {
      // на запрос delete сервер отвечвет НИЧЕГО,  поэтому здесь я удаляю сообщение для отображения
      const existingComments = array.slice(0, index).concat(array.slice(index+1, array.length))
      setFunc(existingComments);
    })
    debugger
  };
  
  useEffect(() => {
    if (location.pathname === '/students') {
      getStudentsRequest({})
        .then(res => setFunc(res.items));
    }
    if (location.pathname === '/comments') {
      getCommentsRequest({})
        .then(res => {
          setFunc(res.items)
        });
    }
  }, [])
  if (array?.length && location.pathname === '/students' ) {
    return (
      array.map(user => {
        return (
          <tr className={styles.line} key={user._id}>
            <td className={styles.line}>{user.cohort}</td>
            <td className={styles.line}>{user.email}</td>
            <td className={styles.line}>{user.name}</td>
          </tr >
        )
      })
    )
  }
  if (array?.length && location.pathname === '/comments') {
    return (
      array.map((comment, index) => {
        return (
          <tr className={styles.line} key={comment._id}>
            <td className={styles.line}>{comment.cohort}</td>
            <td className={styles.line}>{comment.date}</td>
            <td className={styles.line}>{comment.from.name}</td>
            <td className={styles.line}>{comment.to.name}</td>
            <td className={styles.line}>{comment.target}</td>
            <td className={styles.line}>{comment.text}</td>
            <td className={styles.button_container}>
              <button className={styles.button} style={{ backgroundImage: `url(${deletePic})` }} onClick={()=>(deleteHandler(comment._id, index))}></button>
            </td>
          </tr >
        )
      })
    )
  }
}