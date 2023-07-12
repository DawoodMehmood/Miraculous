import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css"; // Import the CSS file for styling

const Navbar = () => {
    const location = useLocation();
    useEffect(() => {
        if (window.scrollY > 0) {
            window.scrollTo(0, 0); // Scroll to the top when the location changes and scroll position is not already at the top
        }
        // Scroll to the top when the location changes
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <nav className="navbar ">
            <ul className="list-wrap">
                <li
                    className={
                        location.pathname === "/home" ? "active home" : ""
                    }
                >
                    <Link to="/home">
                        <ion-icon name="home"></ion-icon>
                    </Link>
                </li>
                <li
                    className={
                        location.pathname === "/news" ? "active news" : ""
                    }
                >
                    <Link to="/news">
                        <ion-icon name="newspaper-outline"></ion-icon>
                    </Link>
                </li>
                <li
                    className={
                        location.pathname === "/play" ||
                        location.pathname.startsWith("/watch/")
                            ? "active play"
                            : ""
                    }
                >
                    <Link to="/play">
                        <ion-icon name="play-circle"></ion-icon>
                    </Link>
                </li>
                <li
                    className={
                        location.pathname === "/specials"
                            ? "active specials"
                            : ""
                    }
                >
                    <Link to="/specials">
                        <ion-icon name="planet"></ion-icon>
                    </Link>
                </li>
                <li
                    className={
                        location.pathname === "/credits" ? "active credits" : ""
                    }
                >
                    <Link to="/credits">
                        <ion-icon name="person-add"></ion-icon>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
