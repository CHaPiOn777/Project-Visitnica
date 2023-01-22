import styles from './list-line.module.css'
import deletePic from './../../images/delete.svg';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { getStudentsRequest, putStudentInfoRequest } from '../../services/utils/api/admin-students';
import { deletecommentRequest, getCommentsRequest } from '../../services/utils/api/admin-comments';

// компонент универсальный, в зависимости от роута заполняет таблицу данными
// принимает массив данных (студентов или сообщений) и 
// функцию изменения массива (переданы из компонентов страниц setStudents или setComments)
export const ListLine = ({ array, setFunc }) => {
  const location = useLocation();

  //удаление комментария
  const deleteHandler = (id, index) => {
    deletecommentRequest(id)
      .then(res => {
        // на запрос delete сервер отвечвет НИЧЕГО,  поэтому здесь я удаляю сообщение для отображения
        const existingComments = array.slice(0, index).concat(array.slice(index + 1, array.length))
        setFunc(existingComments);
      })
  };
  const submitHandler = (key, id) => {
    const changedElement = key.target;
    const changedLine = key.target.parentElement.children;
    if (key.keyCode === 13) {
      key.preventDefault();
      //debugger
      changedElement.setAttribute('contentEditable', 'false');
      //из HTMLCollection (измененная строка) сделала массив, взяла значение из каждого поля
      const [cohort, email, name] = Array.from(changedLine).map(el => el.innerText);
      const newData = {
        id: id,
        cohort,
        email,
        name
      }
      // сервер возвращает неизмененного студента, поэтому дальше с данными ничего не делала 
      putStudentInfoRequest(newData)
        .then(res => {
          changedElement.setAttribute('contentEditable', 'true');
        })
    }
    if (key.keyCode === 27) {
      changedElement.setAttribute('contentEditable', 'false');
      changedElement.setAttribute('contentEditable', 'true');
    }
  }

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
  if (array?.length && location.pathname === '/students') {
    return (
      array.map(user => {
        return (
          <tr className={styles.line} style={{ cursor: 'pointer' }} key={user._id} >
            <td
              className={styles.line}
              contentEditable={true}
              suppressContentEditableWarning={true}
              onKeyDown={(key) => submitHandler(key, user._id)} >
              {user.cohort}
            </td>
            <td
              className={styles.line}
              contentEditable={true}
              suppressContentEditableWarning={true}
              onKeyDown={(key) => submitHandler(key, user._id)} >
              {user.email}
            </td>
            <td
              className={styles.line}
              contentEditable={true}
              suppressContentEditableWarning={true}
              onKeyDown={(key) => submitHandler(key, user._id)} >
              {user.name}
            </td>
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
            <td className={styles.line} >{comment.cohort}</td>
            <td className={styles.line}>{comment.date}</td>
            <td className={styles.line}>{comment.from.name}</td>
            <td className={styles.line}>{comment.to.name}</td>
            <td className={styles.line}>{comment.target}</td>
            <td className={styles.line}>{comment.text}</td>
            <td className={styles.button_container}>
              <button
                className={styles.button}
                style={{ backgroundImage: `url(${deletePic})` }}
                onClick={() => (deleteHandler(comment._id, index))}></button>
            </td>
          </tr >
        )
      })
    )
  }
}