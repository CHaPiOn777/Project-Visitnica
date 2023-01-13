import React, { useState, useEffect } from 'react';
import styles from './app.module.css';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Input } from '../input/input';
import { Switch, Route } from 'react-router-dom';
import { LoginPage } from '../../pages/login/login';
import { setCookie } from '../../services/utils/cookie';
import { getUserInfo } from '../api/api';

function App() {
  const user = {} //данные юзера, тут есть id
  useEffect(()=> {
    if(document.location.hash) {
      const newToken = document.location.hash.split('&').find(el=>el.includes('access_token')).split('=')[1]
      setCookie('accessToken', newToken);
      getUserInfo()
        .then(res => res.json())
        .then(res => {
          for (let key in res) {
            user[key] = res[key];
          }
        })
    }
  }, [document.location.hash])
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Switch>
          <Route path={'/'} exact={true}>
            <div style={{ fontWeight: 500, fontSize: 60 }}>
              Шрифты подключены
            </div>
            <div style={{ fontWeight: 400, fontSize: 60 }}>
              на 400 и 500 =)
            </div>
            <Input />
          </Route>
          <Route path='/login' exact={true}>
            <LoginPage />
          </Route>
        </Switch>


      </main>
      <Footer />
    </div>
  );
}

export default App;
