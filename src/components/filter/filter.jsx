import { useLocation } from 'react-router-dom';
import { getCommentsRequest } from '../../services/utils/api/get-comments';
import { getStudentsRequest } from '../../services/utils/api/get-students';
import styles from './filter.module.css';



export const Filter =  ({ setFunc }) => {
  const location = useLocation();
  const onSubmit = (evt) => {
    evt.preventDefault();
    const searchCondition = evt.target.condition.value.toLowerCase();
    if(location.pathname === '/students') {
      getStudentsRequest({search: searchCondition})
      .then(res => { res?.items.length ? setFunc(res.items) : setFunc([]) });
    }
    if(location.pathname === '/comments') {
      getCommentsRequest({search: searchCondition})
      .then(res => { setFunc(res.items) });
    }
  }
  return(
    <form className={styles.container} onSubmit={onSubmit}>
      <label htmlFor='filter_input' className={styles.name} >Фильтровать</label>
      <input 
      id='filter_input' 
      name='condition'
      className={styles.input}
      placeholder='По имени или фамилии, или почте, или номеру когорты (введите любой из этих параметров)' ></input>
    </form>
  )
}