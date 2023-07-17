import styles from './components.module.css';
function Header() {
    return (
        <header className={`${styles.header}`}>
            <img src="../../header-logo.png" className={`${styles.logo}`} alt='logo'/>
        </header>
    );
  }

  export default Header;
