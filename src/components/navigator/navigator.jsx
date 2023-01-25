import { Link, NavLink } from "react-router-dom";
import styles from './navigator.module.css';

export const ToggleNavigator = () => {
  return (
    <nav className={styles.container}>
      <NavLink
        to='/admin/users'
        exact={true}
        className={styles.link}
        activeClassName={styles.link_active} >СТУДЕНТЫ</NavLink>
      <NavLink
        to='/comments'
        exact={true}
        className={styles.link}
        activeClassName={styles.link_active} >КОММЕНТАРИИ</NavLink>
    </nav>

  )
}