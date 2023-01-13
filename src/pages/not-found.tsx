import { Link } from 'react-router-dom';
import styles from './not-found.module.css';

export default function NotFound () {
  return (
    <main className={styles.container}>
      <h1>404</h1>
      <p>Запрошенная страница не существует.</p>
      {/* <Link to='/'>Вернуться на главную</Link> */}
    </main>
  )
}