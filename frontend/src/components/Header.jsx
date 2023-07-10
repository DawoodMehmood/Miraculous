import styles from './components.module.css';
function Header() {
    return (
        <header className={`${styles.header}`}>
            <img src="https://i.ibb.co/Xkp4M7G/IR-S5-MAINLOGO.png" className={`${styles.logo}`} alt='logo'/>
        </header>
    );
  }

  export default Header;
