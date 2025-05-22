import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getVehiculos, deleteVehiculo } from '../../services/api';

function VehiculosList() {
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadVehiculos();
  }, []);

  const loadVehiculos = async () => {
    try {
      setLoading(true);
      const data = await getVehiculos();
      setVehiculos(data);
      setError(null);
    } catch (err) {
      console.error("Error al cargar los vehículos:", err);
      setError("No se pudieron cargar los vehículos. Intenta de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (placa) => {
    if (window.confirm('¿Estás seguro que deseas eliminar este vehículo?')) {
      try {
        await deleteVehiculo(placa);
        loadVehiculos();
      } catch (err) {
        console.error("Error al eliminar el vehículo:", err);
        setError("No se pudo eliminar el vehículo. Intenta de nuevo más tarde.");
      }
    }
  };

  if (loading) return <div>Cargando vehículos...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Listado de Vehículos</h1>
        <Link to="/vehiculos/nuevo" className="btn btn-success">Nuevo Vehículo</Link>
      </div>

      {vehiculos.length === 0 ? (
        <p>No hay vehículos registrados.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Placa</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Año</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vehiculos.map(vehiculo => (
              <tr key={vehiculo.placa}>
                <td>{vehiculo.placa}</td>
                <td>{vehiculo.marca}</td>
                <td>{vehiculo.modelo}</td>
                <td>{vehiculo.año}</td>
                <td>{vehiculo.precio !== undefined && vehiculo.precio !== null ? `$${vehiculo.precio.toLocaleString()}` : 'N/A'}</td>
                <td>
                  <Link to={`/vehiculos/editar/${vehiculo.placa}`} className="btn btn-warning">
                    Editar
                  </Link>
                  <button 
                    onClick={() => handleDelete(vehiculo.placa)} 
                    className="btn btn-danger"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default VehiculosList;
