<<<<<<< HEAD

import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Input } from '../input/input';
import { Switch, Route } from 'react-router-dom';
import LoginPage from '../../pages/login/login';
import { getCookie, setCookie } from '../../services/utils/cookie';
import { getToken } from '../../services/utils/token';
import CommentsPage from '../../pages/comments/comments';
import MainPage from '../../pages/main-page/main-page';
import StudentsPage from '../../pages/students/students';
import ProtectedRoute from '../protected-route/protected-route';
import { getUserInfo } from '../../services/utils/api/commentApi';
import Comment from '../comment/comment';
import PurpleBtn from '../btn/btn';
import MapPage from '../../pages/map/map';
import NotFound from '../../pages/not-found/not-found';

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
                  Шрифты подключены на 400, 500 и 700
                </div>
                <Input />
              </>*/
            }
            <>
              <div style={{ fontWeight: 500, fontSize: 60 }}>
                Шрифты подключены
              </div>
              <div style={{ fontWeight: 400, fontSize: 60 }}>
                на 400 и 500 =)
              </div>
              <PurpleBtn text='Test' />
              <Comment />
              <Input />
            </>
          </Route>
          <Route path='/login' exact={true}>
            <LoginPage />
          </Route>
          <ProtectedRoute path="/cohort/:cohort" auth="curator">
            <MainPage />
          </ProtectedRoute>
          <Route path='/students'>
            <StudentsPage />
          </Route>
          <Route path='/comments'>
            <CommentsPage />
          </Route>
          <Route path='/map' exact={true}>
            <MapPage />
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
=======

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
import NotFound from '../../pages/not-found';
import MainPage from '../../pages/main-page/main-page';
import { DetailPage } from '../detailPage/detailPage';

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
          <Route path={'/detailinfo/:id'} exact={true}>
            <DetailPage />
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
>>>>>>> feet/infoBlock
