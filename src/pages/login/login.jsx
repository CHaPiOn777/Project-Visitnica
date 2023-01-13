import styles from './login.module.css';

export const LoginPage = () => {
  
  return(
    <main className={styles.main}>
      <div>
        <p className={styles.text} >С кем я учусь?</p>
        <a href='https://oauth.yandex.ru/authorize?response_type=token&client_id=a658c83148cf495f9b4b864843601cf1'>войти с яндекс id</a>
        <div>
          <form>
            <input type='text'></input>
            <button type='submit'></button>
          </form>
        </div>
      </div>
    </main>
  )
}