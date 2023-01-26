import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getProfileReactions from "../../services/utils/api/get-profile-reacitons";
import styles from "./profile-thumb.module.css";
import ButtonComments from "./comments-thumb/button-comments";

type TThumbProps = {
  _id: string;
  name: string;
  photo: string;
  city: {
    name: string;
  }
  owner: boolean;
  curator: boolean;
}

export default function ProfileThumb(props: TThumbProps) {
  const [commentCount, setCommentCount] = useState<number>(0);

  useEffect(() => {
    if (props.curator) {
      getProfileReactions({ limit: 0, id: props._id }).then((res) => {
        setCommentCount(res.total);
      }).catch((err) => {
        console.error(`Ошибка загрузки комментариев: ${err}`);
      });
    }
  }, []);
  

  return (
    <article className={styles.container}>
      <div className={styles['chat-icon']}>
        <ButtonComments user={props} block='undefined'/>
      </div>
      <Link className={styles['link-overlay']} to={{ pathname: `/detailinfo/${props._id}` }}>
        <div className={styles['image-border']}>
          <img className={styles.image} src={props.photo} alt={props.name} />
        </div>
        <p className={styles.name}>{props.name}</p>
        <p className={styles.city}>{props.city.name}</p>
        {props.curator && <p className={styles.city}>{commentCount} сообщений</p>}
      </Link>
    </article>
  )
}