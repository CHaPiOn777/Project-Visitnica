import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProfileThumb from "../../components/profile-thumb/profile-thumb";

import getCohortProfiles from "../../services/utils/api/get-cohort-profiles";

import styles from "./main-page.module.css";
import { TProfile, TUser } from "../../services/utils/types";
import LoadingIcon from "../../components/loading-icon/loading-icon";
import useOnScreen from "../../hooks/use-on-screen";
import getUserProfile from "../../services/utils/api/get-user-profile";
import CitySelector from "../../components/city-selector/city-selector";

export default function MainPage () {
  const { cohort } = useParams<{ cohort: string }>();
  const [profiles, setProfiles] = useState<TProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<TUser>();
  const [city, setCity] = useState<string | null>(null);
  const term = useRef<HTMLDivElement>(null);
  const numberOfProfiles = useRef<number | null>(null);
  const cities = useRef<Set<string> | null>(new Set());
  
  // Начальная загрузка профилей
  useEffect(() => {
    setIsLoading(true);
    // псевдозапрос на получение данных текущего пользователя:
    getUserProfile().then((res) => {
      setCurrentUser(res);
      getCohortProfiles({ offset: 0, limit: 12, cohort: cohort || currentUser?.cohort }).then((res) => {
        numberOfProfiles.current = res.total;
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
        setIsLoading(false);
        console.error(`Ошибка загрузки профилей пользователей: ${err}`);
      });
    });
  }, []);

  // Отслеживаем появление во вьюпорте дива с рефом term и догружаем еще профилей, если он появляется.
  const isAtBottom = useOnScreen(term);
  useEffect(() => {
    if (isAtBottom && !isLoading/* && (numberOfProfiles.current && profiles.length < numberOfProfiles.current)*/) {
      // setIsLoading(true);
      getCohortProfiles({offset: profiles.length, limit: 12, cohort: cohort || currentUser?.cohort}).then((res) => {
        setProfiles((profiles) => profiles.concat(res.items));
        // !REMOVE искусственно добавляем больше профилей
        let arr: TProfile[] = [...profiles];
        const oldLength = arr.length;
        while (arr.length < oldLength + 12) {
          arr = arr.concat(res.items);
        }
        setProfiles(arr);

        setIsLoading(false);
      }).catch((err) => {
        setIsLoading(false);
        console.error(`Ошибка подгрузки профилей пользователей: ${err}`);
      });
    }
  }, [isAtBottom, city]);

  const elements = useMemo(() => {
    return profiles.map((item: TProfile, index) => {
      cities.current!.add(item.profile.city.name);
      if (!city || city === item.profile.city.name) return (
        <ProfileThumb 
          key={item._id + index}
          id={item._id}
          curator={currentUser?.role === "curator"}
          owner={item._id === currentUser?._id}
          {...item.profile}
        />
      )
    })
  }, [profiles, city]);
  
  return (
    <main className={styles.main}>
      <div className={styles.lead}>
        <CitySelector cities={cities.current} setFunction={setCity} />
        <Link className={styles.link} to='/map'>Посмотреть на карте</Link>
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