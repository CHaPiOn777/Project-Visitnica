import { CommentsLine } from './comments-line';
import styles from './comments-table.module.css';

export const CommentsTable = () => {
  return (
    <section className={styles.container}>
    <table className={styles.table}>
      <thead >
        <tr >
          <th className={styles.header}>Когорта</th>
          <th className={styles.header} >Дата</th>
          <th className={styles.header} >Отправитель</th>
          <th className={styles.header} >Получатель</th>
          <th className={styles.header} >Откуда комментарий</th>
          <th className={styles.header} >Текст комментария</th>
          <th className={styles.header} ></th>
        </tr>
      </thead>

      <tbody>
        <CommentsLine />
      </tbody>
    </table>
    </section>
  )
}