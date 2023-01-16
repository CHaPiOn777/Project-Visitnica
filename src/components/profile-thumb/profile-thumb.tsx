import styles from "./profile-thumb.module.css";

type TThumbProps = {
  name: string;
  photo: string;
  city: {
    name: string;
  }
}

export default function ProfileThumb (props: TThumbProps) {
  return (
    <div className={styles.container}>
      <img src={props.photo} />
      <p>{props.name}</p>
      <p>{props.city.name}</p>
    </div>
  )
}