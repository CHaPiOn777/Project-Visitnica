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
import Comment from '../comment/comment';
import PurpleBtn from '../btn/btn';
import MapPage from '../../pages/map/map';
import NotFound from '../../pages/not-found/not-found';
import { DetailPage } from '../../pages/detailPage/detailPage';
import { ProfileEdit } from '../../pages/profile-edit/profile-edit';
import getUserProfile from '../../services/utils/api/get-user-profile';

// REMOVE! контекст для роли юзера
export const AuthContext = React.createContext('curator');

function App() {
  const [name, setName] = useState();
  const [avatar, setAvatar] = useState();
  const user = {} //данные юзера, тут есть id

  // REMOVE! задаём роль
  const [currentUser, setCurrentUser] = useState(null);
  console.log('blah');

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
    getUserProfile().then((res) => {
      setCurrentUser(res);
    });
  }, [user, name])
  
  return (
    <AuthContext.Provider value={{
      currentUser,
      setCurrentUser
    }}>
      <div className={styles.page}>
        <Header user={{ name, avatar }} />
        <Switch>
          <Route path={'/'} exact={true} auth="student" redirect="cohort/web+16">
            <MainPage />
            {
              /*<>
                <div style={{ fontWeight: 500, fontSize: 60 }}>
                  Шрифты подключены на 400, 500 и 700
                </div>
                <Input />
              </>            <>
              <div style={{ fontWeight: 500, fontSize: 60 }}>
                Шрифты подключены
              </div>
              <div style={{ fontWeight: 400, fontSize: 60 }}>
                на 400 и 500 =)
              </div>
              <PurpleBtn text='Test' />
              <Comment />
              <Input />
            </>*/
            }

          </Route>
          <Route path='/login' exact={true}>
            <LoginPage />
          </Route>
          <ProtectedRoute path={'/detailinfo/:id'} exact={true}>
            <DetailPage />
          </ProtectedRoute>
          <ProtectedRoute path='/profile'>
            <ProfileEdit />
          </ProtectedRoute>
          <ProtectedRoute path="/cohort/:cohort" auth="curator">
            <MainPage />
          </ProtectedRoute>
          <ProtectedRoute path='/students' auth="curator">
            <StudentsPage />
          </ProtectedRoute>
          <ProtectedRoute path='/comments' auth="curator">
            <CommentsPage />
          </ProtectedRoute>
          <ProtectedRoute path='/map' exact={true}>
            <MapPage />
          </ProtectedRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
