import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './list-line.module.css';

export default function ListLineAdded({array}) {
  const location = useLocation();

  const addedList = useMemo(() => 
  {
    return (
      array.map(user => {
        return (
          <tr 
            className={styles.line_type_added} 
            key={user._id} 
          >
            <td className={styles.line_type_added} >
              <div
                className='cohort' >
                {user.cohort}
              </div>
            </td>
            <td className={styles.line_type_added} >
              <div>
                {user.email}
              </div>
            </td>
            <td className={styles.line_type_added} >
              <div >
                {/* здесь пусто, т.к. в файле с информацией о студентах нет ФИО */}
              </div>
            </td>
          </tr >
        )
      })
    )
  }, [array.length])
  
  if (array.length && location.pathname === '/admin/users') {
    return addedList
  }
}