import styles from "./views.module.css";
import VideoPlayer from "../components/Videoplayer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaArrowLeft, FaDownload } from "react-icons/fa";
import BASE_URLS from "../../config";
const BASE_URL = BASE_URLS.BASE_URL;
const APP_URL = BASE_URLS.APP_URL;

function Player() {
    const { id } = useParams();
    const [video, setVideoData] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await axios.get(
                    `${BASE_URL}/api/videos/${id}`
                );
                setVideoData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        // Update the meta tags
        document.title = video.meta_title;
        const meta_titleTag = document.querySelector('meta[name="title"]');
        if (meta_titleTag) {
          meta_titleTag.setAttribute('content', video.meta_title);
        }

        const metaDescriptionTag = document.querySelector('meta[name="description"]');
            if (metaDescriptionTag) {
              metaDescriptionTag.setAttribute('content', video.meta_description);
            }

        const fetchLanguages = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/languages`);
                setLanguages(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchVideos = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/videos`);
                setVideos(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchVideoData();
        fetchLanguages();
        fetchVideos();
    }, [id, video.meta_title, video.meta_description]);

    const goBack = () => {
        window.history.back();
    };

    const toggleVisibility = () => {
        document.getElementById("item").style.display =
            document.getElementById("item").style.display === "block"
                ? "none"
                : "block";
    };

    const handleLanguageChange = (selectedLanguageId) => {
        document.getElementById("item").style.display = "none";
        // Find the video object with the matching selectedLanguageId, season_no, episode_no, and episode_type
        const selectedVideo = videos.find(
            (v) =>
                v.language_id === selectedLanguageId &&
                v.season_no === video.season_no &&
                v.episode_no === video.episode_no &&
                v.episode_type === video.episode_type
        );

        if (selectedVideo) {
            window.location.href = `${APP_URL}/watch/${selectedVideo.id}`;
        }
    };

    const handleDownload = () => {
        window.open(video.download_link, "_blank");
    };

    return (
        <div className={styles.container}>
            <div className={`${styles.player} ${styles["full-height"]}`}>
                <div className={`${styles.flag}`}>
                    <div className={`${styles.langselector}`}>
                        <button
                            className={`${styles.langbutton}`}
                            onClick={toggleVisibility}
                        >
                            <img
                                src="https://miraculous.to/flags/flag-en.jpg"
                                alt="flag"
                                className={`${styles.mainflag}`}
                            />
                        </button>
                        <ul className={`${styles.langchooser}`} id="item">
                            <div>
                                {languages.map((language) => (
                                    <li
                                        key={language.id}
                                        className={`${styles.langitem}`}
                                        onClick={() =>
                                            handleLanguageChange(language.id)
                                        }
                                    >
                                        <img
                                            src={language.flagUrl}
                                            alt="flag"
                                            className={`${styles.menuflag}`}
                                        />
                                        <div>{language.name}</div>
                                    </li>
                                ))}
                            </div>
                        </ul>
                    </div>
                </div>
                <br />
                <div className={`${styles.videoinfocontainer}`}>
                    <div className={`${styles.videoinfo}`}>
                        <div>
                            <div className={`${styles.videometainfo}`}>
                                S{video.season_no}
                            </div>
                            <div className={`${styles.videometainfo}`}>
                                E{video.episode_no}
                            </div>
                            <div className={`${styles.videometainfo}`}>
                                {video.episode_duration}
                            </div>
                        </div>
                        <div className={`${styles.videoepisodetitle}`}>
                            {video.episode_title}
                        </div>
                        <div className={`${styles.videoshowtitle}`}>
                            Miraculous: Tales of Ladybug and Cat Noir
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <div className={`${styles.videoinfocontainer}`}>
                    <div
                        className={`${styles.videoplayer}`}
                        itemProp="video"
                        itemScope=""
                        itemType="http://schema.org/VideoObject"
                    >
                        <VideoPlayer
                            poster={video.thumbnail_image_link}
                            videoUrl={video.video_url}
                            downloadUrl={video.download_link}
                        />
                    </div>

                    <div className={`${styles.buttoncontainer}`}>
                        <button
                            className={`${styles.backbutton} text-white font-bold py-2 px-3`}
                            onClick={goBack}
                        >
                            <FaArrowLeft />
                            &nbsp;Go Back
                        </button>
                        <button
                            onClick={handleDownload}
                            className={`${styles.backbutton} text-white font-bold py-2 px-3`}
                        >
                            Download &nbsp;
                            <FaDownload />
                        </button>
                    </div>
                </div>
                <div className={`${styles.videoinfocontainer} text-white`}>
                    <div className={`${styles.article}`}>
                        <h2>{video.article_heading}</h2>
                        <p>{video.article_description}</p>
                    </div>
                </div>
                <div className={`${styles.separator}`}></div>
            </div>
        </div>
    );
}

export default Player;
