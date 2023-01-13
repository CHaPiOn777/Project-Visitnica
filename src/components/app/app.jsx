import styles from './app.module.css';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Input } from '../input/input';
import { Switch, Route } from 'react-router-dom';
import NotFound from '../../pages/not-found';

function App() {
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
