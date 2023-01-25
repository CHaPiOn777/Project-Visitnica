import { useLocation } from 'react-router';
import { ListLine } from './list-line';
import styles from './list-table.module.css';


export const ListTable = ({ header, array, setFunc }) => {
  const location = useLocation();

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
                    {/* {location.pathname === '/comments' && */}
                      <th className={styles.header} key='button'></th>
                     {/* } */}
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
}