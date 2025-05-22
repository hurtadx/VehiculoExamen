import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Sistema de Gestión de Ventas de Vehículos</h1>
      
      <div className="dashboard">
        <div className="dashboard-card">
          <h2>Clientes</h2>
          <p>Gestión de clientes para el sistema de ventas</p>
          <div className="card-actions">
            <Link to="/clientes" className="btn btn-primary">Ver listado</Link>
            <Link to="/clientes/nuevo" className="btn btn-success">Nuevo cliente</Link>
          </div>
        </div>
        
        <div className="dashboard-card">
          <h2>Vehículos</h2>
          <p>Inventario de vehículos disponibles</p>
          <div className="card-actions">
            <Link to="/vehiculos" className="btn btn-primary">Ver listado</Link>
            <Link to="/vehiculos/nuevo" className="btn btn-success">Nuevo vehículo</Link>
          </div>
        </div>
        
        <div className="dashboard-card">
          <h2>Ventas</h2>
          <p>Registro de ventas realizadas</p>
          <div className="card-actions">
            <Link to="/ventas" className="btn btn-primary">Ver listado</Link>
            <Link to="/ventas/nueva" className="btn btn-success">Nueva venta</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
