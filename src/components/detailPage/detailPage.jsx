import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './detailPage.module.css';
import ava from '../../images/Avatarka.jpg';
import qotes from '../../images/Qotes.svg';
import union from '../../images/Union.svg';
import telegram from '../../images/Subtract.svg';
import { getUsers } from '../api/api';



export const DetailPage = () => {

  getUsers();
  return (
    <div>
      <h1 className={styles.name}>Виктория Листвиновская</h1>
      <h2 className={styles.city}>Калуга</h2>
      <ul className={styles.socialmedia}>
        <li>
          <NavLink
            exact
            to="#"
            className={styles.link}
            activeClassName={styles.link_active}
          >
            <img src={telegram} alt="Telegram" />
          </NavLink>
          <NavLink
            exact
            to="#"
            className={styles.link}
            activeClassName={styles.link_active}
          >
            <img src={union} alt="Union" />
          </NavLink>
        </li>
      </ul>
      <img src={ava} alt="аватарка" />
      <div className="citates">
        <img src={qotes} alt="Кавычки" />
        <blockquote>Делай, что должно и будь, что будет.</blockquote>
      </div>

    </div>
  );
};

