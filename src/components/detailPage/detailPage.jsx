import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import styles from './detailPage.module.css';
import ava from '../../images/Avatarka.jpg';
import qotes from '../../images/Qotes.svg';
import union from '../../images/Union.svg';
import telegram from '../../images/Subtract.svg';
import getUserInfo from '../../services/utils/api/getUserInfo';
import LoadingIcon from '../loading-icon/loading-icon';


export const DetailPage = () => {
  const params = useParams();
  const prodId = params.id;
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getUserInfo(prodId)
      .then(res => {
        setUser(res);
        setIsLoading(false);
      })
  }, [])
  console.log(user)
  return (
    <>
      {!isLoading ?
        <div className={styles.page}>
          <h1 className={styles.name}>{user.profile.name}</h1>
          <h2 className={styles.city}>{user.profile.city.name}</h2>
          <ul className={styles.socialmedia}>
            <li>
              <a
                href={`https://web.telegram.org/k/#@${user.profile.telegram}`}
                className={styles.link}
              >
                <img src={telegram} alt="Telegram" />
              </a>
            </li>
            <li>
              <a
                href={`https://web.telegram.org/k/#@${user.profile.telegram}`}
                className={styles.link}
              >
                <img src={union} alt="GitHab" />
              </a>
            </li>
          </ul>
          <div className={styles.wrapperAva}>
            <img src={user.profile.photo} alt="аватарка" className={styles.ava} />
          </div>
          <div className="citates">
            <img src={qotes} alt="Кавычки" />
            <blockquote className={styles.blockquote}>{user.profile.quote}</blockquote>
          </div>
          <div className={styles.blocks}>

            <div className={styles.block}>
              <h3 className={styles.blockTitle}>Увлечения</h3>
              <div className={styles.blockImgWrapper}>
                <img src={user.info.hobby.image} alt="Увлечения" className={styles.blockImg} />
              </div>
              <p className={styles.blockText}>{user.info.hobby.text}</p>
            </div>

            <div className={styles.block}>
              <h3 className={styles.blockTitle}>Семья</h3>
              <div className={styles.blockImgWrapper}>
                <img src={user.info.status.image} alt="Семья" className={styles.blockImg} />
              </div>
              <p className={styles.blockText}>{user.info.status.text}</p>
            </div>

            <div className={styles.block}>
              <h3 className={styles.blockTitle}>Сфера</h3>
              <div className={styles.blockImgWrapper}>
                <img src={user.info.job.image} alt="Сфера деятельности" className={styles.blockImg} />
              </div>
              <p className={styles.blockText}>{user.info.job.text}</p>
            </div>

            <div className={styles.block}>
              <h3 className={styles.blockTitle}>Учеба</h3>
              <div className={styles.blockImgWrapper}>
                <img src={user.info.edu.image} alt="Учеба" className={styles.blockImg} />
              </div>
              <p className={styles.blockText}>{user.info.edu.text}</p>
            </div>
          </div>
        </div> :
        <LoadingIcon />
      }

    </>
  );
};

