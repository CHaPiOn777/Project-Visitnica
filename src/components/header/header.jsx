import styles from './header.module.css';
import logo from '../../images/VISITKI.svg';
import { useEffect } from 'react';

export const Header = ({ user }) => {
  const { name } = user;
  
  return (
      <header className={styles.header}>
          <img src={logo} alt='visitki' className={styles.logo} />
           { name ? (<div className={styles.user}>
              <div className={styles.photo} style={{backgroundColor: 'red'}} ></div>
              <p className={styles.name} >{name}</p>
          </div>) : null}
      </header>
  )
}
