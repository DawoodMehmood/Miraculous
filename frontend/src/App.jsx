import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import withClickAnimation from './components/ClickAnimationHOC';
import Home from './views/Home';
import News from './views/News';
import Play from './views/Play';
import Specials from './views/Specials';
import Credits from './views/Credits';
import Navbar from './components/Navbar';
import Player from './views/Player';
import { useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../config';

const App = () => {
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
      }, []);

  return (

    <div className="App">
        <BrowserRouter>
        <div className="pages">
          <Routes>
          <Route
              path="/"
              element={<Navigate to="/home" />}
            />
            <Route
              path="/home"
              element={<Home />}
            />
            <Route
              path="/news"
              element={<News />}
            />
            <Route
              path="/play"
              element={<Play />}
            />
            <Route
              path="/specials"
              element={<Specials />}
            />
            <Route
              path="/credits"
              element={<Credits />}
            />
            <Route
              path="/watch/:id"
              element={<Player />}
            />
          </Routes>
        </div>
        <Navbar/>
      </BrowserRouter>

    </div>

  )
}

export default withClickAnimation(App);
