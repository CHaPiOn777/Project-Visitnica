import styles from './app.module.css';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

function App() {
  return (
    <div className={styles.page}>
      <Header />
      <div style={{ fontWeight: 500, fontSize: 60 }}>
        Шрифты подключены
      </div>
      <div style={{ fontWeight: 400, fontSize: 60 }}>
        на 400 и 500 =)
      </div>
      <Footer />
    </div>
  );
}

export default App;
