import styles from './list-line.module.css'
import deletePic from './../../images/delete.svg';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { getStudentsRequest, putStudentInfoRequest } from '../../services/utils/api/admin-students';
import { deletecommentRequest, getCommentsRequest } from '../../services/utils/api/admin-comments';

// компонент универсальный, в зависимости от роута заполняет таблицу данными
// принимает массив данных (студентов или сообщений) и 
// функцию изменения массива (переданы из компонентов страниц setStudents или setComments)
export const ListLine = ({ array, setFunc }) => {
  const location = useLocation();
  const history = useHistory();
  const target = {
    hobby: 'Увлечения',
    job: 'Сфера',
    edu: 'Учеба',
    status: 'Статус',
    family: 'Семья',
    quote: 'Цитата'
  };

  //удаление комментария
  const deleteHandler = (id, index) => {
    deletecommentRequest(id)
      .then(res => {
        // на запрос delete сервер отвечвет НИЧЕГО,  поэтому здесь я удаляю сообщение для отображения
        const existingComments = array.slice(0, index).concat(array.slice(index + 1, array.length))
        setFunc(existingComments);
      })
      .catch((err) => {console.error(`Ошибка удаления комментария: ${err}`)});
  };

  // подсвечивает остальные ячейки в редактируемой строке
  // часть else удаляет студента
  const onClick = (evt, id) => {
    const changedLine = Array.from(evt.currentTarget.children);
    if (evt.target.tagName !== 'BUTTON') {
      const hightLights = Array.from(document.querySelectorAll(`.${styles.changed_line}`));
      if (hightLights.length) {
        hightLights.map(el => el.classList.remove(`${styles.changed_line}`))
      }
      changedLine.forEach(el => {
        el.children[0].classList.add(`${styles.changed_line}`) 
      })
    }
    else {
      // запрос 
      evt.currentTarget.querySelector('.cohort').textContent = 'deleted';
      const [cohort, email, name] = changedLine.map(el => el.innerText);
      const newData = {
        id,
        cohort: 'deleted',
        email 
      }
      putStudentInfoRequest(newData)
    }
  }

  // по Enter отправляет измененную информацию
  // по Esc выходит из редактирования
  const submitHandler = (key, id) => {
    const changedElement = key.target;
    //из HTMLCollection (измененная строка) сделала массив
    const changedLine = Array.from(key.target.closest('tr').children);
    changedLine.forEach(el => {
      if (el.children[0] !== changedElement) { el.children[0].classList.remove(`${styles.changed_line}`) }
    })
    if (key.keyCode === 13) {
      key.preventDefault();
      changedElement.setAttribute('contentEditable', 'false');
      const [cohort, email, name] = changedLine.map(el => el.innerText);
      const newData = {
        id: id,
        cohort,
        email
      }
      // сервер возвращает неизмененного студента, поэтому дальше с данными ничего не делала 
      putStudentInfoRequest(newData)
        .then(res => {
          changedElement.setAttribute('contentEditable', 'true');
        })
        .catch((err) => { console.error(`Ошибка изменения данных студента: ${err}`)});
    }
    if (key.keyCode === 27) {
      changedElement.setAttribute('contentEditable', 'false');
      changedLine.forEach(el => {
        el.children[0].classList.remove(`${styles.changed_line}`)
      })
      changedElement.setAttribute('contentEditable', 'true');
    }
  }

  useEffect(() => {
    if (location.pathname === '/admin/users') {
      getStudentsRequest({})
        .then(res => setFunc(res.items))
        .catch((err) => { console.error(`Ошибка запроса данных студента: ${err}`) });
    }
    if (location.pathname === '/admin/') {
      getCommentsRequest({})
        .then(res => {
          setFunc(res.items)
        })
        .catch((err) => { console.error(`Ошибка запроса комментариев: ${err}`) });
    }
  }, [location.pathname, setFunc])
  if (array?.length && location.pathname === '/admin/users') {
    return (
      array.map(user => {
        return (
          <tr 
          className={styles.line} 
          style={{ cursor: 'pointer' }} 
          key={user._id} 
          onClick={evt => onClick(evt, user._id)}>
            <td className={styles.line} >
              <div 
                contentEditable={true}
                suppressContentEditableWarning={true}
                onKeyDown={(key) => submitHandler(key, user._id)} 
                className='cohort' >
                {user.cohort}
              </div>
            </td>
            <td className={styles.line} >
              <div
                contentEditable={true}
                suppressContentEditableWarning={true}
                onKeyDown={(key) => submitHandler(key, user._id)} >
                {user.email}
              </div>
            </td>
            <td 
            className={styles.line} 
            onClick={(evt)=> {
              history.replace(`/detailinfo/${user._id}`)
            }} >
              <div >
                {user.name}
              </div>
            </td>
            <td className={styles.button_container}>
              <button
                className={styles.button}
                style={{ backgroundImage: `url(${deletePic})` }} ></button>
            </td>
          </tr >
        )
      })
    )
  }
  if (array?.length && location.pathname === '/admin/') {
    return (
      array.map((comment, index) => {
        return (
          <tr className={styles.line} key={comment._id}>
            <td className={styles.line} >{comment.cohort}</td>
            <td className={styles.line}>{comment.date}</td>
            <td className={styles.line}>{comment.from.name}</td>
            <td className={styles.line}>{comment.to.name}</td>
            <td className={styles.line}>
              {comment.target ? `из блока ${target[comment.target]}` : 'из визитки'}</td>
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