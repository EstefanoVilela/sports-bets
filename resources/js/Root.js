import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/app.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { History } from './pages/History'
import { Navbar } from "./components/Navbar";
import { useEffect, useState } from "react";

function App() {
  const [session, setSession] = useState(null);

  const signIn = () => {
    Cookies.set('userSession', 1);
    setSession(1);
  }

  const logout = () => {
    Cookies.remove('userSession');
    setSession(null);
  }

  useEffect(() => {
    const userCookie = Cookies.get('userSession');
    setSession(userCookie)
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container-fluid py-3">
        <Routes>
          <Route path="/" element={ session ? <Home logout={ logout } /> : <Login signIn={ signIn } /> } />
          <Route path="/history" element={ <History /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;