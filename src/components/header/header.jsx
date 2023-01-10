import styles from './header.module.css';
import logo from '../../images/VISITKI.svg';

export const Header = () => {
    return (
        <header className={styles.header}>
            <img src={logo} alt='visitki' className={styles.logo} />
            <div className={styles.user}>
                <div className={styles.photo} style={{backgroundColor: 'red'}} ></div>
                <p className={styles.name} >Константин Константинопольский</p>
            </div>
        </header>
    )
}
