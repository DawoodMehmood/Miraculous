import styles from "./views.module.css";
import VideoPlayer from "../components/Videoplayer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import BASE_URL from '../../config';


function Player() {
    const { id } = useParams();
    const [video, setVideoData] = useState([]);

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

        fetchVideoData();
    }, [id]);

    const goBack = () => {
        window.history.back();
    };

    const handlemenu = () => {
        document.getElementById("item").style.display = "none";
    };

    const toggleVisibility = () => {
        document.getElementById("item").style.display =
            document.getElementById("item").style.display === "block"
                ? "none"
                : "block";
    };

    return (
        <div>
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
                                <li
                                    className={`${styles.langitem}`}
                                    onClick={handlemenu}
                                >
                                    <img
                                        src="https://miraculous.to/flags/flag-en.jpg"
                                        alt="flag"
                                        className={`${styles.menuflag}`}
                                    />
                                    <div>English</div>
                                </li>
                                <li
                                    className={`${styles.langitem}`}
                                    onClick={handlemenu}
                                >
                                    <img
                                        src="https://miraculous.to/flags/flag-en.jpg"
                                        alt="flag"
                                        className={`${styles.menuflag}`}
                                    />
                                    <div>Espanol Europeo</div>
                                </li>
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
                    <div className={`${styles.videoplayer}`} itemProp="video" itemScope="" itemType="http://schema.org/VideoObject">
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
                            &nbsp;Go Back to list of Episodes
                        </button>
                    </div>
                </div>
                <div className={`${styles.videoinfocontainer} text-white`}>
                    <div>
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
