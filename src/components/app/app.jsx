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

// REMOVE! контекст для роли юзера добавлен ТОЛЬКО для работы переключателя ролей в хедере.
// Роль юзера получалась фейковым апи-запросом он деманд.
export const AuthContext = React.createContext(null);

function App() {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const user = {} //данные юзера, тут есть id

  // REMOVE! задаём роль
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    getUserProfile().then((res) => setCurrentUser(res)).catch((err) => {
      console.error(`Ошибка загрузки профиля пользователя: ${err}`);
    });
  }, []);

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
        }).catch((err) => {
          console.error(`Ошибка получения токена: ${err}`);
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

  if (!currentUser?.role) {
    return <>loading</>;
  }
  
  return (
    <AuthContext.Provider value={{
      currentUser,
      setCurrentUser
    }}>
      <div className={styles.page}>
        <Header user={{ name, avatar }} />
        <Switch>
          <ProtectedRoute path={'/'} exact={true} auth="student" redirect="/cohort/:cohort">
            <MainPage />
          </ProtectedRoute>
          <Route path='/login' exact={true}>
            <LoginPage />
          </Route>
          <ProtectedRoute path={'/detailinfo/:id'} exact={true}>
            <DetailPage />
          </ProtectedRoute>
          <ProtectedRoute path='/profile' auth="student">
            <ProfileEdit />
          </ProtectedRoute>
          <ProtectedRoute path="/cohort/:cohort" auth="curator">
            <MainPage />
          </ProtectedRoute>
          <ProtectedRoute path='/admin/users' auth="curator">
            <StudentsPage />
          </ProtectedRoute>
          <ProtectedRoute path='/admin/' auth="curator">
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
