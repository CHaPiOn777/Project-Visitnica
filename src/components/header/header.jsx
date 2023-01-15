import styles from './header.module.css';
import logo from '../../images/VISITKI.svg';

export const Header = ({ user }) => {
  const { name, avatar } = user;
  
  return (
      <header className={styles.header}>
          <img src={logo} alt='visitki' className={styles.logo} />
           { name ? (<div className={styles.user}>
              <div className={styles.photo} style={{backgroundImage: `url(https://avatars.yandex.net/get-yapic/${avatar}/islands-34)`}} ></div>
              <p className={styles.name} >{name}</p>
          </div>) : null}
      </header>
  )
}
