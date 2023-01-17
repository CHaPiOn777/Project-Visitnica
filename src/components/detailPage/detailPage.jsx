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
    <div className={styles.page}>
      <h1 className={styles.name}>Виктория Листвиновская</h1>
      
      <ul className={styles.socialmedia}>
        <li><h2 className={styles.city}>Калуга</h2></li>
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
      <img src={ava} alt="аватарка" className={styles.ava}/>
      <div className="citates">
        <img src={qotes} alt="Кавычки" />
        <blockquote className={styles.blockquote}>Делай, что должно и будь, что будет.</blockquote>
      </div>
      <div className={styles.blocks}>
        <div className={styles.block}>
          <h3 className="">Увлечения</h3>
          <img src="" alt="" className="" />
          <p>
            Увлекаюсь программированием, игрой на&nbsp;гитаре, вышиваю крестиком и&nbsp;играю в&nbsp;настолки. Увлекаюсь программированием, игрой на&nbsp;гитаре,
            вышиваю крестиком и&nbsp;играю в&nbsp;настолки. Увлекаюсь программированием, игрой на&nbsp;гитаре, вышиваю крестиком и&nbsp;играю в&nbsp;настолки.
          </p>
        </div>
        <div className={styles.block}>
          <h3 className="">Увлечения</h3>
          <img src="" alt="" className="" />
          <p>
            Увлекаюсь программированием, игрой на&nbsp;гитаре, вышиваю крестиком и&nbsp;играю в&nbsp;настолки. Увлекаюсь программированием, игрой на&nbsp;гитаре,
            вышиваю крестиком и&nbsp;играю в&nbsp;настолки. Увлекаюсь программированием, игрой на&nbsp;гитаре, вышиваю крестиком и&nbsp;играю в&nbsp;настолки.
          </p>
        </div>
        <div className={styles.block}>
          <h3 className="">Увлечения</h3>
          <img src="" alt="" className="" />
          <p>
            Увлекаюсь программированием, игрой на&nbsp;гитаре, вышиваю крестиком и&nbsp;играю в&nbsp;настолки. Увлекаюсь программированием, игрой на&nbsp;гитаре,
            вышиваю крестиком и&nbsp;играю в&nbsp;настолки. Увлекаюсь программированием, игрой на&nbsp;гитаре, вышиваю крестиком и&nbsp;играю в&nbsp;настолки.
          </p>
        </div>
        <div className={styles.block}>
          <h3 className="">Увлечения</h3>
          <img src="" alt="" className="" />
          <p>
            Увлекаюсь программированием, игрой на&nbsp;гитаре, вышиваю крестиком и&nbsp;играю в&nbsp;настолки. Увлекаюсь программированием, игрой на&nbsp;гитаре,
            вышиваю крестиком и&nbsp;играю в&nbsp;настолки. Увлекаюсь программированием, игрой на&nbsp;гитаре, вышиваю крестиком и&nbsp;играю в&nbsp;настолки.
          </p>
        </div>
      </div>
    </div>
  );
};

