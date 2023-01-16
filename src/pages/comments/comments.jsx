import { CommentsTable } from '../../components/comments-table/comments-table';
import { Filter } from '../../components/filter/filter';
import { ToggleNavigator } from '../../components/navigator/navigator';
import styles from './comments.module.css';

export const CommentsPage = () => {
  return(
    <main className={styles.main}>
      <ToggleNavigator />
      <Filter />
      <CommentsTable />
    </main>
  )
}