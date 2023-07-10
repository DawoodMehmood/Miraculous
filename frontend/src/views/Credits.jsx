import styles from './views.module.css';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../config';

function Credits() {
    const [teleURL, setTeleURL] = useState('');

    useEffect(() => {

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
