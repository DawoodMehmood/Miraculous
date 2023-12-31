import Header from "../components/Header";
import styles from "./views.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BASE_URLS from "../../config";
const BASE_URL = BASE_URLS.BASE_URL;

function Play() {
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

                // Sort the videos by episode number in ascending order
                const sortedVideos = response.data.sort(
                    (a, b) => a.episode_no - b.episode_no
                );
                setVideos(sortedVideos);
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
        (video) => video.episode_type === "episodes" && video.language_id == "1"
    );
    const season1 = filteredVideos.filter((episode) => episode.season_no === 1);
    const season2 = filteredVideos.filter((episode) => episode.season_no === 2);
    const season3 = filteredVideos.filter((episode) => episode.season_no === 3);
    const season4 = filteredVideos.filter((episode) => episode.season_no === 4);
    const season5 = filteredVideos.filter((episode) => episode.season_no === 5);

    const season1Length = season1.length;
    const season2Length = season2.length;
    const season3Length = season3.length;
    const season4Length = season4.length;
    const season5Length = season5.length;

    const changeSeason = (val) => {
        const allElements = document.querySelectorAll('[id^="season-"]');

        if (val === "all") {
            // Show all elements
            allElements.forEach((element) => {
                element.style.display = "block";
            });
        } else {
            // Hide all elements
            allElements.forEach((element) => {
                element.style.display = "none";
            });

            // Show the element with the corresponding ID
            const targetElement = document.getElementById(`season-${val}`);
            if (targetElement) {
                targetElement.style.display = "block";
            }
        }
    };

    return (
        <div>
            <Header />
            <div className={`${styles.play} ${styles["full-height"]}`}>
                <div className={`${styles.title}`}>Episodes</div>
                <div>
                    <header className={`${styles["season-menu"]}`}>
                        <ul>
                            <li
                                className={`${styles["season-list"]}`}
                                onClick={() => changeSeason("all")}
                            >
                                ALL
                            </li>
                            <li onClick={() => changeSeason(1)}>Season 1</li>
                            <li onClick={() => changeSeason(2)}>Season 2</li>
                            <li onClick={() => changeSeason(3)}>Season 3</li>
                            <li onClick={() => changeSeason(4)}>Season 4</li>
                            <li onClick={() => changeSeason(5)}>Season 5</li>
                        </ul>
                    </header>
                    <div className="container">
                        <div className="my-8" id="season-1">
                            <h2 className={`${styles.seasonNo}`}>
                                {season1Length > 0 && "Season 1"}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {season1 &&
                                    season1.map((video) => (
                                        <Link
                                            to={`/watch/${video.id}`}
                                            className={`${styles["special-card-container"]}`}
                                            key={video.id}
                                        >
                                            <div
                                                className={`${styles["episode-card"]}`}
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
                                                        src={
                                                            video.thumbnail_image_link
                                                        }
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
                                                            S{video.season_no} E
                                                            {video.episode_no}{" "}
                                                            {
                                                                video.episode_duration
                                                            }
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

                        <div className="my-8" id="season-2">
                            <h2 className={`${styles.seasonNo}`}>
                                {season2Length > 0 && "Season 2"}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {season2 &&
                                    season2.map((video) => (
                                        <Link
                                            to={`/watch/${video.id}`}
                                            className={`${styles["special-card-container"]}`}
                                            key={video.id}
                                        >
                                            <div
                                                className={`${styles["episode-card"]}`}
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
                                                        src={
                                                            video.thumbnail_image_link
                                                        }
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
                                                            S{video.season_no} E
                                                            {video.episode_no}{" "}
                                                            {
                                                                video.episode_duration
                                                            }
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

                        <div className="my-8" id="season-3">
                            <h2 className={`${styles.seasonNo}`}>
                                {season3Length > 0 && "Season 3"}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {season3 &&
                                    season3.map((video) => (
                                        <Link
                                            to={`/watch/${video.id}`}
                                            className={`${styles["special-card-container"]}`}
                                            key={video.id}
                                        >
                                            <div
                                                className={`${styles["episode-card"]}`}
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
                                                        src={
                                                            video.thumbnail_image_link
                                                        }
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
                                                            S{video.season_no} E
                                                            {video.episode_no}{" "}
                                                            {
                                                                video.episode_duration
                                                            }
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

                        <div className="my-8" id="season-4">
                            <h2 className={`${styles.seasonNo}`}>
                                {season4Length > 0 && "Season 4"}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {season4 &&
                                    season4.map((video) => (
                                        <Link
                                            to={`/watch/${video.id}`}
                                            className={`${styles["special-card-container"]}`}
                                            key={video.id}
                                        >
                                            <div
                                                className={`${styles["episode-card"]}`}
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
                                                        src={
                                                            video.thumbnail_image_link
                                                        }
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
                                                            S{video.season_no} E
                                                            {video.episode_no}{" "}
                                                            {
                                                                video.episode_duration
                                                            }
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

                        <div className="my-8" id="season-5">
                            <h2 className={`${styles.seasonNo}`}>
                                {season5Length > 0 && "Season 5"}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {season5 &&
                                    season5.map((video) => (
                                        <Link
                                            to={`/watch/${video.id}`}
                                            className={`${styles["special-card-container"]}`}
                                            key={video.id}
                                        >
                                            <div
                                                className={`${styles["episode-card"]}`}
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
                                                        src={
                                                            video.thumbnail_image_link
                                                        }
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
                                                            S{video.season_no} E
                                                            {video.episode_no}{" "}
                                                            {
                                                                video.episode_duration
                                                            }
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
                    </div>
                </div>
                <div className={`${styles.separator}`}></div>
            </div>
        </div>
    );
}

export default Play;
