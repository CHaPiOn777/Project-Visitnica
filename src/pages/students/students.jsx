import styles from './students.module.css';
import { Filter } from "../../components/filter/filter";
import { ToggleNavigator } from "../../components/navigator/navigator";
import { ListTable } from '../../components/list-table/list-table';


export default function StudentsPage () {
  return(
    <main className={styles.main}>
      <ToggleNavigator />
      <Filter />
      <ListTable />
    </main>
  )
}