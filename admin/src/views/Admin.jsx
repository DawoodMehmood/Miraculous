import { useState } from "react";
import CreateVideo from "../components/CreateVideo";
import Home from "../components/Home";
import News from "../components/News";
import Specials from "../components/Specials";
import Episodes from "../components/Episodes";
import GeneralMeta from "../components/GeneralMeta";
import Languages from "../components/Languages";
import Register from "../components/Register";
import styles from "./styles.module.css";

function Admin() {
    const [activeComponent, setActiveComponent] = useState("createVideo");

    const renderComponent = () => {
        switch (activeComponent) {
            case "home":
                return <Home />;
            case "news":
                return <News />;
            case "specials":
                return <Specials />;
            case "episodes":
                return <Episodes />;
            case "metaTags":
                return <GeneralMeta />;
            case "languages":
                return <Languages />;
            case "register":
                return <Register />;
            default:
                return <CreateVideo />;
        }
    };

    return (
        <div className={`${styles["admin-page"]}`}>
            <div className={`${styles["sidebar"]}`}>
                <div className={`${styles["sidebar-content"]}`}>
                <ul>
                    <li
                        className={
                            activeComponent === "register"
                                ? `${styles.active}`
                                : ""
                        }
                        onClick={() => setActiveComponent("register")}
                    >
                        Manage Admins
                    </li>
                    <li
                        className={
                            activeComponent === "metaTags"
                                ? `${styles.active}`
                                : ""
                        }
                        onClick={() => setActiveComponent("metaTags")}
                    >
                        General Meta Data
                    </li>
                    <li
                        className={
                            activeComponent === "languages"
                                ? `${styles.active}`
                                : ""
                        }
                        onClick={() => setActiveComponent("languages")}
                    >
                        Set Languages
                    </li>
                    <li
                        className={
                            activeComponent === "createVideo"
                                ? `${styles.active}`
                                : ""
                        }
                        onClick={() => setActiveComponent("createVideo")}
                    >
                        New Episode
                    </li>
                    <li
                        className={
                            activeComponent === "home" ? `${styles.active}` : ""
                        }
                        onClick={() => setActiveComponent("home")}
                    >
                        Home
                    </li>
                    <li
                        className={
                            activeComponent === "news" ? `${styles.active}` : ""
                        }
                        onClick={() => setActiveComponent("news")}
                    >
                        News
                    </li>
                    <li
                        className={
                            activeComponent === "specials"
                                ? `${styles.active}`
                                : ""
                        }
                        onClick={() => setActiveComponent("specials")}
                    >
                        Specials
                    </li>
                    <li
                        className={
                            activeComponent === "episodes"
                                ? `${styles.active}`
                                : ""
                        }
                        onClick={() => setActiveComponent("episodes")}
                    >
                        Episodes
                    </li>
                </ul>
                </div>
            </div>
            <div className={styles["content"]}>{renderComponent()}</div>
        </div>
    );
}

export default Admin;
