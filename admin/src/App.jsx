import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Admin from './views/Admin';
import Header from './components/Header';
const App = () => {

    return (

      <div className="App">
        <Header />
          <BrowserRouter>
          <div className="pages">
            <Routes>
            <Route
                path="/"
                element={<Navigate to="/admin" />}
              />
              <Route
                path="/admin"
                element={<Admin />}
              />
            </Routes>
          </div>
        </BrowserRouter>

      </div>

    )
  }

  export default App;
