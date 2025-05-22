import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">AutoVentas</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/clientes">Clientes</Link>
        </li>
        <li>
          <Link to="/vehiculos">Vehículos</Link>
        </li>
        <li>
          <Link to="/ventas">Ventas</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
