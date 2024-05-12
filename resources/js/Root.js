import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/app.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Navbar } from "./components/Navbar";
import { useEffect, useState } from "react";

function Root() {
  const [userId, setUserId] = useState(null);

  const signIn = ({ id, role_id }) => {
    Cookies.set('userId', id);
    Cookies.set('roleId', role_id);
    setUserId(id);
  }

  const logout = () => {
    Cookies.remove('userId');
    Cookies.remove('roleId');
    setUserId(null);
  }

  useEffect(() => {
    const _userId = Cookies.get('userId');
    setUserId(_userId);
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container-fluid py-3">
        <Routes>
          <Route path="/" element={ userId ? <Home logout={ logout } /> : <Login signIn={ signIn } /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Root;