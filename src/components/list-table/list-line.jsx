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

  //подсвечивает остальные ячейки в редактируемой строке
  const onClick = (evt) => {
    const changedLine = Array.from(evt.target.closest('tr').children);
    changedLine.map(el => {
      if (el !== evt.target.parentElement) { el.children[0].classList.add(`${styles.changed_line}`) }
    })
  }

  // по Enter отправляет измененную информацию
  const submitHandler = (key, id) => {
    const changedElement = key.target;
    //из HTMLCollection (измененная строка) сделала массив
    const changedLine = Array.from(key.target.closest('tr').children);
    changedLine.map(el => {
      if (el.children[0] !== changedElement) { el.children[0].classList.remove(`${styles.changed_line}`) }
    })
    if (key.keyCode === 13) {
      key.preventDefault();
      changedElement.setAttribute('contentEditable', 'false');
      const [cohort, email, name] = changedLine.map(el => el.innerText);
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
      changedLine.map(el => {
        if (el.children[0] !== changedElement) { el.children[0].classList.remove(`${styles.changed_line}`) }
      })
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
            <td className={styles.line} >
              <div contentEditable={true}
                suppressContentEditableWarning={true}
                onClick={onClick}
                onKeyDown={(key) => submitHandler(key, user._id)}>
                {user.cohort}
              </div>
            </td>
            <td className={styles.line} >
              <div
                contentEditable={true}
                suppressContentEditableWarning={true}
                onClick={onClick}
                onKeyDown={(key) => submitHandler(key, user._id)} >
                {user.email}
              </div>
            </td>
            <td className={styles.line} >
              <div
                contentEditable={true}
                suppressContentEditableWarning={true}
                onClick={onClick}
                onKeyDown={(key) => submitHandler(key, user._id)} >
                {user.name}
              </div>
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