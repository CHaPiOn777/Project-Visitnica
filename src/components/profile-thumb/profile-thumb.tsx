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
      <img className={styles.image} src={props.photo} alt={props.name} />
      <p className={styles.name}>{props.name}</p>
      <p className={styles.city}>{props.city.name}</p>
    </div>
  )
}