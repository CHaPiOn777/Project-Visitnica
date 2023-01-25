import { useLocation } from 'react-router-dom';
import styles from './filter.module.css';
import { getCommentsRequest } from '../../services/utils/api/admin-comments';
import { getStudentsRequest } from '../../services/utils/api/admin-students';
import clearPic from './../../images/clear.svg';


// фильтр отправляет запрос, но приходит неизмененный ответ.
export const Filter = ({ setFunc }) => {
  const location = useLocation();

  // показывает кнопку сброса фильтра при вводе
  const onChange = () => {
    const button = document.querySelector(`.${styles.button}`);
    button.classList.add(`${styles.visible}`)
  }

  // сбрасывает фильтр
  const clearHangler = (evt) => {
    evt.target.parentElement.querySelector('input').value = '';
    if (location.pathname === '/admin/users') {
      getStudentsRequest({ search: '' })
        .then(res => { res?.items.length ? setFunc(res.items) : setFunc([]) });
    }
    if (location.pathname === '/comments') {
      getCommentsRequest({ search: '' })
        .then(res => { setFunc(res.items) });
    }
  }

  //отправить запрос с параметрами
  const onSubmit = (evt) => {
    evt.preventDefault();
    const searchCondition = evt.target.condition.value.toLowerCase();
    if (location.pathname === '/admin/users') {
      getStudentsRequest({ search: searchCondition })
        .then(res => { res?.items.length ? setFunc(res.items) : setFunc([]) });
    }
    if (location.pathname === '/comments') {
      debugger
      getCommentsRequest({ search: searchCondition })
        .then(res => { setFunc(res.items) });
    }
  }

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <label htmlFor='filter_input' className={styles.name} >Фильтровать</label>
      <input
        id='filter_input'
        name='condition'
        className={styles.input}
        placeholder='По имени или фамилии, или почте, или номеру когорты (введите любой из этих параметров)'
        onChange={onChange} >
      </input>
      <button
        className={styles.button}
        style={{ backgroundImage: `url(${clearPic})` }}
        type='button'
        onClick={(evt) => clearHangler(evt)} >
      </button>
    </form>
  )
}
