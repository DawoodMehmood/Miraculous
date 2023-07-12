import styles from './views.module.css';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../config';

function Credits() {
    const [teleURL, setTeleURL] = useState('');

    useEffect(() => {
        const fetchMetaTags = async () => {
            try {
              const response = await axios.get(`${BASE_URL}/api/meta`);
              const { metaTitle, metaDesc, favicon } = response.data;

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

              // Update the favicon
              const faviconTag = document.querySelector('link[rel="shortcut icon"]');
              if (faviconTag) {
                faviconTag.setAttribute('href', favicon);
              }
            } catch (error) {
              console.error('Error fetching meta tags:', error);
            }
          };

          fetchMetaTags();
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
    return (
        <div>
            <Header />
            <div className={`${styles.credits} ${styles["full-height"]}`}>
            <div className={`${styles.title}`}>
                credits
            </div>
            <div className={`${styles.managedBy}`}>
                Managed by &nbsp;
                <a target="_blank" href={teleURL} rel="noreferrer noopener">@plaggzworld</a>
            </div>
        </div>
        </div>
      );
  }

  export default Credits;
