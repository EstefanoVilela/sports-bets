import { Link } from "react-router-dom";
import ApuestaTotal from "../assets/apuesta-total.jpeg";

export const Navbar = () => (
  <nav className="navbar bg-dark">
    <div className="container-fluid">
      <Link to="/" className="navbar-brand">
        <img src={ ApuestaTotal } alt="" width="200" />
      </Link>
    </div>
  </nav>
)