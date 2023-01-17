import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ProfileThumb from "../../components/profile-thumb/profile-thumb";

import getCohortProfiles from "../../services/utils/api/get-cohort-profiles";

import styles from "./main-page.module.css";
import { TProfile } from "../../services/utils/types";
import LoadingIcon from "../../components/loading-icon/loading-icon";
import useOnScreen from "../../hooks/use-on-screen";
import getUserProfile from "../../services/utils/api/get-user-profile";

export default function MainPage () {
  const [profiles, setProfiles] = useState<TProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>('');
  const term = useRef<HTMLDivElement>(null);
  
  // Начальная загрузка профилей
  useEffect(() => {
    setIsLoading(true);
    // псевдозапрос на получение данных текущего пользователя:
    getUserProfile().then((res) => setCurrentUser(res));
    getCohortProfiles({offset: 0, limit: 12, cohort: currentUser.cohort}).then((res) => {
      if (res.items?.length > 0) {
        // setProfiles(res.items);
        // !REMOVE искусственно наполняем массив профилей, чтобы сделать вёрстку нормально
        let arr: TProfile[] = [];
        while (arr.length < 12) {
          arr = arr.concat(res.items);
        }
        setProfiles(arr);

        setIsLoading(false);
      }
    }).catch((err) => {
      console.error(`Ошибка загрузки профилей пользователей: ${err}`);
    })
  }, []);

  // Отслеживаем появление во вьюпорте дива с рефом term и догружаем еще профилей, если он появляется.
  const isAtBottom = useOnScreen(term);
  useEffect(() => {
    if (isAtBottom && !isLoading) {
      // setIsLoading(true);
      getCohortProfiles({offset: profiles.length, limit: 12, cohort: currentUser.cohort}).then((res) => {
        setProfiles((profiles) => profiles.concat(res.items));
        // !REMOVE искусственно добавляем больше профилей
        let arr: TProfile[] = [...profiles];
        const oldLength = arr.length;
        while (arr.length < oldLength + 12) {
          arr = arr.concat(res.items);
        }
        setProfiles(arr);

        setIsLoading(false);
      })
    }
  }, [isAtBottom]);

  const elements = useMemo(() => {
    return profiles.map((item: TProfile, index) => {
      return (
        <ProfileThumb 
          key={item._id + index}
          id={item._id}
          curator={currentUser.role === "curator"}
          withComments={item._id === currentUser._id}
          {...item.profile}
        />
      )
    })
  }, [profiles]);
  
  return (
    <main className={styles.main}>
      <div className={styles.lead}>
        <span>здесь должен быть елемент выбора города</span>
        <Link className={styles.link} to='/'>Посмотреть на карте</Link>
      </div>
      <div className={styles.gallery}>
        {elements}
      </div>
      <div className={styles.terminator} ref={term}>
        {isLoading && (
          <LoadingIcon />
        )}
      </div>
    </main>
  )
}