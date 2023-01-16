import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProfileThumb from "../../components/profile-thumb/profile-thumb";

import getCohortProfiles from "../../services/utils/api/get-cohort-profiles";

import styles from "./main-page.module.css";
import { TProfile } from "../../services/utils/types";

export default function MainPage () {
  const [profiles, setProfiles] = useState([]);
  
  useEffect(() => {
    getCohortProfiles().then((res) => {
      if (res.items?.length > 0) {
        let arr: any = [];
        while (arr.length < 8) {
          arr = arr.concat(res.items);
        }
        setProfiles(arr);
        // setProfiles(res);
      }
    }).catch((err) => {
      console.error(`Ошибка загрузки профилей пользователей: ${err}`);
    })
  }, []);

  const elements = useMemo(() => {
    return profiles.map((item: TProfile, index) => {
      return <ProfileThumb key={item._id + index} {...item.profile} />
    })
  }, [profiles]);
  
  return (
    <main className={styles.main}>
      <div className={styles.lead}>
        <span>здесь должен быть елемент выбора города</span>
        <Link to='/'>Посмотреть на карте</Link>
      </div>
      <div className={styles.gallery}>
        {elements}
      </div>
    </main>
  )
}