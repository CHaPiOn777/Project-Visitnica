import styles from './comments-line.module.css'
import deletePic from './../../images/delete.svg';

export const CommentsLine = () => {
  return(
    <tr className={styles.line} >
        <td className={styles.line}>Microsoft</td>
        <td className={styles.line}>20.3</td>
        <td className={styles.line}>30.5</td>
        <td className={styles.line}></td>
        <td className={styles.line}></td>
        <td className={styles.line}></td>
        <td className={styles.button_container}>
          <button className={styles.button} style={{ backgroundImage: `url(${deletePic})` }}></button>
        </td>
    </tr >
  )
}