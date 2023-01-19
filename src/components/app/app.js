import styles from './app.module.css';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { ProfileEdit } from '../profile-edit/profile-edit';

function App() {
  
  return (
    <div className={styles.page}>
      <Header />
      
      <ProfileEdit />
      <Footer />
    </div>
  );
}

export default App;
