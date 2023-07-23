import styles from "./views.module.css";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BASE_URLS from "../../config";
const BASE_URL = BASE_URLS.BASE_URL;

function Home() {
    const [videos, setVideos] = useState([]);
    const [teleURL, setTeleURL] = useState("");
    const [twitchURL, setTwitchURL] = useState("");
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

        setTeleURL(data.teleLink);
        setTwitchURL(data.twitchLink);

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
    }, [data.metaTitle, data.metaDesc, data.jsCode, data.teleLink, data.twitchLink]);

    const filteredVideos = videos.filter(
        (video) => video.episode_type === "home" && video.language_id == "1"
    );

    return (
        <div>
            <Header />
            <div className={`${styles.home} ${styles["full-height"]}`}>
                <div className={`${styles.title}`}>Home</div>
                <div className={`${styles["container"]}`}>
                    <div className={`${styles["home-content"]}`}>
                        <div className={`${styles["col-md-6"]}`}>
                            {filteredVideos && (
                                <div className={`${styles["home-heading"]}`}>
                                    New Episodes
                                </div>
                            )}
                            {filteredVideos &&
                                filteredVideos.map((video) => (
                                    <div key={video.id}>
                                        <Link to={`/watch/${video.id}`}>
                                            <div className={`${styles.card}`}>
                                                <img
                                                    src={
                                                        video.thumbnail_image_link
                                                    }
                                                    alt="Episode img"
                                                    className={`${styles["card-image"]}`}
                                                />
                                                <div
                                                    className={`${styles["card-content"]}`}
                                                >
                                                    <h3
                                                        className={`${styles["card-title"]}`}
                                                    >
                                                        {video.episode_title}
                                                    </h3>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className={`${styles["home-flex-content"]}`}>
                        <div className={`${styles["twitchbox"]}`}>
                            {twitchURL && (
                                <div>
                                    <div
                                        className={`${styles["home-livestream"]}`}
                                    >
                                        <h2>Livestream:</h2>
                                    </div>
                                    <div className={`${styles["twitch"]}`}>
                                        <div
                                            className={`${styles["twitch-video"]}`}
                                        >
                                            <iframe
                                                src={twitchURL}
                                                height="100%"
                                                width="100%"
                                                allowFullScreen
                                                title="Miraculous Live"
                                            ></iframe>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <a
                                className={`${styles["card"]}`}
                                href={teleURL}
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                <img
                                    src="../../telelinkimg.jpg"
                                    alt="Card Background"
                                    className={`${styles["card-image"]}`}
                                />
                                <div className={`${styles["card-content"]}`}>
                                    <h3 className={`${styles["card-tele"]}`}>
                                        Follow us on
                                        Telegram:&nbsp;&#64;plaggzworld
                                    </h3>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className={`${styles.separator}`}></div>
            </div>
        </div>
    );
}

export default Home;
