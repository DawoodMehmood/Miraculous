import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import withClickAnimation from './components/ClickAnimationHOC';
import Home from './views/Home';
import News from './views/News';
import Play from './views/Play';
import Specials from './views/Specials';
import Credits from './views/Credits';
import Navbar from './components/Navbar';
import Player from './views/Player';

const App = () => {

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
