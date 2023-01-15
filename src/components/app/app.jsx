import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import styles from './app.module.css';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Input } from '../input/input';
import { Switch, Route } from 'react-router-dom';
import { LoginPage } from '../../pages/login/login';
import { getCookie, setCookie } from '../../services/utils/cookie';
import { getUserInfo } from '../api/api';

function App() {
  const [name, setName] = useState();
  const user = {} //данные юзера, тут есть id
  useEffect(() => {
    if (document.location.hash) {
      const newToken = document.location.hash.split('&').find(el => el.includes('access_token')).split('=')[1]
      setCookie('accessToken', newToken);
    }
    if (getCookie('accessToken')) {
      getUserInfo()
        .then(async (res) => {
          if (res.ok) {
            const token = await res.text();
            return token
          }
        })
        .then(res => {
          const decodedUser = jwt_decode(res);
          for (let key in decodedUser) {
            user[key] = decodedUser[key];
          }
          setName(decodedUser.name)
        })
    }
  }, [user, name])

  return (
    <div className={styles.page}>
      <Header user={{ name }} />
      <main className={styles.main}>
        <Switch>
          <Route path={'/'} exact={true}>
            <>
              <div style={{ fontWeight: 500, fontSize: 60 }}>
                Шрифты подключены
              </div>
              <div style={{ fontWeight: 400, fontSize: 60 }}>
                на 400 и 500 =)
              </div>
              <Input />
            </>
          </Route>
          <Route path='/login' exact={true}>
            <LoginPage />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>


      </main>
      <Footer />
    </div>
  );
}

export default App;
