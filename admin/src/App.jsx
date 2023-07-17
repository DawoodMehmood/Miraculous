import { BrowserRouter as Router, Route, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Admin from "./views/Admin";
import ProtectedLayout from "./components/ProtectedLayout";
import GuestLayout from "./components/GuestLayout";
import { Routes } from "react-router-dom/dist";
import Header from "./components/Header";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<GuestLayout />}>
                <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="/login" element={<Login />} />
                </Route>
                <Route path="/" element={<ProtectedLayout />}>
                    <Route path="/admin" element={<>
                                <Header />
                                <Admin />
                            </>} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
