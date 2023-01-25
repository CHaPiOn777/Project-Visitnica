import styles from './header.module.css';
import logo from '../../images/VISITKI.svg';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export const Header = ({ user }) => {
  const { name, avatar } = user;
  const { setCurrentUser } = useAuth();
  
  // REMOVE! обработчик переключалки ролей
  function roleChange (evt) {
    setCurrentUser((prev) => {
      return { ...prev, role: evt.target.value }
    });
  }
  
  return (
      <header className={styles.header}>
        <Link to="/">
          <img src={logo} alt='visitki' className={styles.logo} />
      </Link>
      {/* REMOVE! переключалка для ролей */}
      <select onChange={roleChange}>
        <option value="student">student</option>
        <option value="curator">curator</option>
      </select>
      {name ? (<Link to='/profile' className={styles.user}>
              <div className={styles.photo} style={{backgroundImage: `url(https://avatars.yandex.net/get-yapic/${avatar}/islands-34)`}} ></div>
              <p className={styles.name}>{name}</p>
          </Link>) : null}
      </header>
  )
}
