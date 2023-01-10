import styles from './footer.module.css';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p className={styles.text} >&copy; Визитки</p>
            <p className={styles.text} >Яндекс Практикум</p>
        </footer>
    )
}
