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
      if (res.items?.length > 0) setProfiles(res.items);
    }).catch((err) => {
      console.error(`Ошибка загрузки профилей пользователей: ${err}`);
    })
  }, []);

  const elements = useMemo(() => {
    return profiles.map((item: TProfile) => {
      return <ProfileThumb key={item._id} {...item.profile} />
    })
  }, [profiles]);
  
  return (
    <main>
      <div>
        <Link to='/'>Посмотреть на карте</Link>
      </div>
      <div className={styles.gallery}>
        {elements}
      </div>
    </main>
  )
}