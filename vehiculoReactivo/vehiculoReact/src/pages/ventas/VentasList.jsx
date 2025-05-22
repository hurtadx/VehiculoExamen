import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getVentas, deleteVenta } from '../../services/api';

function VentasList() {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadVentas();
  }, []);

  const loadVentas = async () => {
    try {
      setLoading(true);
      const data = await getVentas();
      setVentas(data);
      setError(null);
    } catch (err) {
      console.error("Error al cargar las ventas:", err);
      setError("No se pudieron cargar las ventas. Intenta de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (codigo) => {
    if (window.confirm('¿Estás seguro que deseas eliminar esta venta?')) {
      try {
        await deleteVenta(codigo);
        loadVentas();
      } catch (err) {
        console.error("Error al eliminar la venta:", err);
        setError("No se pudo eliminar la venta. Intenta de nuevo más tarde.");
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  if (loading) return <div>Cargando ventas...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Listado de Ventas</h1>
        <Link to="/ventas/nueva" className="btn btn-success">Nueva Venta</Link>
      </div>

      {ventas.length === 0 ? (
        <p>No hay ventas registradas.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Vehículo</th>
              <th>Monto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map(venta => (
              <tr key={venta.codigo}>
                <td>{venta.codigo}</td>
                <td>{formatDate(venta.fecha)}</td>
                <td>{venta.cliente?.nombre} {venta.cliente?.apellido}</td>
                <td>{venta.vehiculo?.marca} {venta.vehiculo?.modelo}</td>
                <td>{venta.monto ? `$${venta.monto.toLocaleString()}` : 'N/A'}</td>
                <td>
                  <Link to={`/ventas/editar/${venta.codigo}`} className="btn btn-warning">
                    Editar
                  </Link>
                  <button 
                    onClick={() => handleDelete(venta.codigo)} 
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

export default VentasList;
