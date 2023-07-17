import Header from '../components/Header';
import styles from './views.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BASE_URLS from '../../config';
const BASE_URL = BASE_URLS.BASE_URL;

function Specials() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchMetaTags = async () => {
            try {
              const response = await axios.get(`${BASE_URL}/api/meta`);
              const { metaTitle, metaDesc } = response.data;

              // Update the document's title
              if(metaTitle){
                  document.title = metaTitle;
              }

              // Update the meta tags
              const meta_titleTag = document.querySelector('meta[name="title"]');
              if (meta_titleTag) {
                meta_titleTag.setAttribute('content', metaTitle);
              }

              const metaDescriptionTag = document.querySelector('meta[name="description"]');
              if (metaDescriptionTag) {
                metaDescriptionTag.setAttribute('content', metaDesc);
              }

            } catch (error) {
              console.error('Error fetching meta tags:', error);
            }
          };

          fetchMetaTags();

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
      }, []);
    const filteredVideos = videos.filter(video => video.episode_type === 'specials' && video.language_id == '1');

    return (
        <div>
            <Header />
            <div className={`${styles.specials} ${styles['full-height']}`}>
            <div className={`${styles.title}`}>
                Specials
            </div>
            <div >
                <div className={`${styles['specials-content']}`}>
                    <div className={`${styles['specials-grid']}`}>
                        {filteredVideos && filteredVideos.map((video) => (
                            <Link to={`/watch/${video.id}`} className={`${styles['special-card-container']}`} key={video.id}>
                            <div className={`${styles['special-card']}`}>
                                <figure className={`${styles['special-thumbnail']}`}>
                                    <span className={`${styles['special-thumbnail-gradient']}`}>
                                    </span>
                                    <img className={`${styles['special-thumbnail-image']}`} alt='Episode img' src={video.thumbnail_image_link}/>
                                </figure>
                                <div className={`${styles['special-card-metadata']}`}>
                                    <h3 className={`${styles['special-title']}`}>
                                        <span className={`${styles['episode-time']}`}>
                                        {video.episode_duration}
                                        </span>
                                        <br/>
                                        <br/>
                                        {video.episode_title}
                                    </h3>
                                </div>
                            </div>
                        </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className={`${styles.separator}`}></div>
        </div>
        </div>
      );
  }

  export default Specials;
