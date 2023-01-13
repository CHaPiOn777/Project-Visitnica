import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Input } from '../input/input';
import { LoginPage } from '../../pages/login/login';

function App() {
  const [token, setToken] = useState()
  useEffect(()=> {
    if(document.location.hash) {
      const newToken = document.location.hash.split('&').find(el=>el.includes('access_token')).split('=')[1]
      setToken(newToken)
      debugger
    }
    console.log(token, 'app')
  }, [document.location.hash])
  
  return (
    <div className={styles.page}>
      <Header />
      
      <div style={{ fontWeight: 500, fontSize: 60 }}>
        Шрифты подключены
      </div>
      <div style={{ fontWeight: 400, fontSize: 60 }}>
        на 400 и 500 =)
      </div>
      <Input />
      
      <LoginPage />
      <Footer />
    </div>
  );
}

export default App;
