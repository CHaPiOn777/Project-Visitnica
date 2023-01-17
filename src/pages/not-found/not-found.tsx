import { Link } from 'react-router-dom';
import styles from './not-found.module.css';

export default function NotFound () {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.subtitle}>Запрошенная страница не найдена.</p>
      <Link className={styles.link} to='/'>Вернуться на главную</Link>
    </main>
  )
}