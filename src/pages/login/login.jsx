import { Redirect } from 'react-router-dom';
import PurpleBtn from '../../components/btn/btn';
import styles from './login.module.css';

export default function LoginPage () {
  
  if (localStorage.getItem('accessToken')) {
    return (
      <Redirect to="/" />
    );
  }
   
  return(
    <main className={styles.main}>
      <div className={styles.container}>
        <p className={styles.text} >С кем я учусь?</p>
        <a 
          href='https://oauth.yandex.ru/authorize?response_type=token&client_id=a658c83148cf495f9b4b864843601cf1'
          ><PurpleBtn text='Войти с Яндекс ID'/></a>
      </div>
    </main>
  )
}