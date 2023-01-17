import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Input } from '../input/input';
import { Switch, Route } from 'react-router-dom';
import { LoginPage } from '../../pages/login/login';
import { getCookie, setCookie } from '../../services/utils/cookie';
import { getToken } from '../../services/utils/token';
import NotFound from '../../pages/not-found/not-found';
import { CommentsPage } from '../../pages/comments/comments';
import MainPage from '../../pages/main-page/main-page';

function App() {
  const [name, setName] = useState();
  const [avatar, setAvatar] = useState();
  const user = {} //данные юзера, тут есть id
  useEffect(() => {
    if (document.location.hash) {
      const newToken = document.location.hash.split('&').find(el => el.includes('access_token')).split('=')[1]
      setCookie('accessToken', newToken);
    }
    if (getCookie('accessToken') && !localStorage.getItem('accessToken')) {
      getToken(user)
        .then(res => {
          const userData = JSON.parse(localStorage.getItem('accessToken'));
          if (userData) {
            setName(userData.name)
            setAvatar(userData.avatar_id)
          }
    })
    }
    if (getCookie('accessToken') && localStorage.getItem('accessToken')) {
      const userData = JSON.parse(localStorage.getItem('accessToken'));
      const isValid = userData.exp - new Date().getTime();
      if (!isValid) {
        getToken(user)
      }
      setName(userData.name)
      setAvatar(userData.avatar_id)
    }
  }, [user, name])

  return (
    <div className={styles.page}>
      <Header user={{ name, avatar }} />
        <Switch>
          <Route path={'/'} exact={true}>
            <MainPage />
            {
              /*<>
                <div style={{ fontWeight: 500, fontSize: 60 }}>
                  Шрифты подключены
                </div>
                <div style={{ fontWeight: 400, fontSize: 60 }}>
                  на 400 и 500 =)
                </div>
                <Input />
              </>*/
            }
          </Route>
          <Route path='/login' exact={true}>
            <LoginPage />
          </Route>
          <Route path='/tmp' exact={true}>
            <MainPage />
          </Route>
          <Route path='/comments'>
            <CommentsPage />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      <Footer />
    </div>
  );
}

export default App;
