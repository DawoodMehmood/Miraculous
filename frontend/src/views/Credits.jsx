import styles from "./views.module.css";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URLS from "../../config";
const BASE_URL = BASE_URLS.BASE_URL;

function Credits() {
    const [teleURL, setTeleURL] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchMetaTags = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/meta`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching meta tags:", error);
            }
        };

        fetchMetaTags();

        // Update the document's title
        if (data.metaTitle) {
            document.title = data.metaTitle;
        }

        // Update the meta tags
        const meta_titleTag =
            document.querySelector('meta[name="title"]');
        if (meta_titleTag) {
            meta_titleTag.setAttribute("content", data.metaTitle);
        }

        const metaDescriptionTag = document.querySelector(
            'meta[name="description"]'
        );
        if (metaDescriptionTag) {
            metaDescriptionTag.setAttribute("content", data.metaDesc);
        }

        // Create a new script element
        const script = document.createElement("script");

        // Set the textContent property to the JavaScript code
        script.textContent = data.jsCode;

        // Error handling for script execution
        script.onerror = (error) => {
            console.error("Error executing script:", error);
        };

        // Append the script element to the <head> or <body> section of your webpage
        document.head.appendChild(script);


        // Fetch teleURL from the Laravel API
        const fetchTeleURL = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/meta`);
                setTeleURL(response.data.link);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTeleURL();

        return () => {
            document.head.removeChild(script);
        };
    }, [data.metaTitle, data.metaDesc, data.jsCode]);
    return (
        <div>
            <Header />
            <div className={`${styles.credits} ${styles["full-height"]}`}>
                <div className={`${styles.title}`}>credits</div>
                <div className={`${styles.managedBy}`}>
                    Managed by &nbsp;
                    <a className={`${styles.managedByLink}`} target="_blank" href={teleURL} rel="noreferrer noopener">
                        @plaggzworld
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Credits;
