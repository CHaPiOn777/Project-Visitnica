import { CommentsTable } from '../../components/comments-table/comments-table';
import { Filter } from '../../components/filter/filter';
import { ListTable } from '../../components/list-table/list-table';
import { ToggleNavigator } from '../../components/navigator/navigator';
import styles from './comments.module.css';

export default function CommentsPage() {
  return(
    <main className={styles.main}>
      <ToggleNavigator />
      <Filter />
      {/* <CommentsTable /> */}
      <ListTable />
    </main>
  )
}