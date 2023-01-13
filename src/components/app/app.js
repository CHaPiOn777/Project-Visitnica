import styles from './app.module.css';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Input } from '../input/input';
import NotFound from '../../pages/not-found';

function App() {
  return (
    <>
      <Header />
      <NotFound />
      <Footer />
    </> 
  )
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
      <Footer />
    </div>
  );
}

export default App;
