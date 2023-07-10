import styles from "./views.module.css";
import Header from "../components/Header";
import { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../config';

function Home() {
    const [videos, setVideos] = useState([]);
    const [teleURL, setTeleURL] = useState('');

    useEffect(() => {
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
      }, []);
      const filteredVideos = videos.filter(video => video.episode_type === 'home');

    return (
        <div>
            <Header />
            <div className={`${styles.home} ${styles["full-height"]}`}>
                <div className={`${styles.title}`}>Home</div>
                <div className={`${styles["container"]}`}>
                    <div className={`${styles["home-content"]}`}>
                        <div className={`${styles["col-md-6"]}`}>
                            <div className={`${styles["home-heading"]}`}>
                                New Episodes
                            </div>
                            {filteredVideos && filteredVideos.map((video) => (
                                <a key={video.id}>
                                <div
                                    className={`${styles.card}`}
                                >
                                    <img
                                        src={video.thumbnail_image_link}
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
                            </a>
                            ))}
                        </div>
                    </div>
                    <div className={`${styles["home-flex-content"]}`}>
                        <div className={`${styles["twitchbox"]}`}>
                            <div className={`${styles["home-livestream"]}`}>
                                <h2>Livestream:</h2>
                            </div>
                            <div className={`${styles["twich"]}`}>
                                <div className={`${styles["twitch-video"]}`}>
                                    <iframe
                                        src="https://player.twitch.tv/?channel=mymiraculousto&parent=hub.miraculous.to&parent=www.hub.miraculous.to&autoplay=true"
                                        height="100%"
                                        width="100%"
                                        frameBorder="0"
                                        scrolling="no"
                                        allowFullScreen="true"
                                        title="Miraculous Live"
                                    ></iframe>
                                </div>
                            </div>
                            <a
                                className={`${styles["card"]}`}
                                href={teleURL}
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                <img
                                    src="https://hub.miraculous.to/thumbs/Miraculous/live.jpg"
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
