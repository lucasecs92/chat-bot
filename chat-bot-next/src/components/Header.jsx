import styles from '../styles/Header.module.css';

const Header = () => (
    <header className={styles.headerContainer}>
        <h3 onClick={() => window.location.reload() }>
            Basic ChatGPT Bot
        </h3>
    </header>
);
  
export default Header;
  