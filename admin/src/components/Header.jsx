import styles from "./components.module.css";
import axios from "../axios";
function Header() {
    // logout user
    const handleLogout = async () => {
        try {
            const resp = await axios.post("/logout");
            if (resp.status === 200) {
                localStorage.removeItem("user");
                window.location.href = "/";
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <header className={`${styles.header}`}>
            <img src="../../header-logo.png" className={`${styles.logo}`} alt='logo'/>
            <h1>Admin Panel</h1>
            <button onClick={handleLogout} className={`${styles.logout}`}>LOGOUT</button>
        </header>
    );
}

export default Header;
