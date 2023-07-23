import Header from "../components/Header";
import styles from "./views.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BASE_URLS from "../../config";
const BASE_URL = BASE_URLS.BASE_URL;

function Specials() {
    const [videos, setVideos] = useState([]);
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

        // Fetch data from the Laravel API
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/videos`);
                setVideos(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

        return () => {
            document.head.removeChild(script);
        };
    }, [data.metaTitle, data.metaDesc, data.jsCode]);

    const filteredVideos = videos.filter(
        (video) => video.episode_type === "specials" && video.language_id == "1"
    );

    return (
        <div>
            <Header />
            <div className={`${styles.specials} ${styles["full-height"]}`}>
                <div className={`${styles.title}`}>Specials</div>
                <div className="container m-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredVideos &&
                            filteredVideos.map((video) => (
                                <Link
                                    to={`/watch/${video.id}`}
                                    className={`${styles["special-card-container"]}`}
                                    key={video.id}
                                >
                                    <div
                                        className={`${styles["special-card"]}`}
                                    >
                                        <figure
                                            className={`${styles["special-thumbnail"]}`}
                                        >
                                            <span
                                                className={`${styles["special-thumbnail-gradient"]}`}
                                            ></span>
                                            <img
                                                className={`${styles["special-thumbnail-image"]}`}
                                                alt="Episode img"
                                                src={video.thumbnail_image_link}
                                            />
                                        </figure>
                                        <div
                                            className={`${styles["special-card-metadata"]}`}
                                        >
                                            <h3
                                                className={`${styles["special-title"]}`}
                                            >
                                                <span
                                                    className={`${styles["episode-time"]}`}
                                                >
                                                    {video.episode_duration}
                                                </span>
                                                <br />
                                                <br />
                                                {video.episode_title}
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
                <div className={`${styles.separator}`}></div>
            </div>
        </div>
    );
}

export default Specials;
