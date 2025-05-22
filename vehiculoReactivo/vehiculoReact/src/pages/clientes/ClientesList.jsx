import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getClientes, deleteCliente } from '../../services/api';

function ClientesList() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadClientes();
  }, []);

  const loadClientes = async () => {
    try {
      setLoading(true);
      const data = await getClientes();
      setClientes(data);
      setError(null);
    } catch (err) {
      console.error("Error al cargar los clientes:", err);
      setError("No se pudieron cargar los clientes. Intenta de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro que deseas eliminar este cliente?')) {
      try {
        await deleteCliente(id);
        loadClientes();
      } catch (err) {
        console.error("Error al eliminar el cliente:", err);
        setError("No se pudo eliminar el cliente. Intenta de nuevo más tarde.");
      }
    }
  };

  if (loading) return <div>Cargando clientes...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Listado de Clientes</h1>
        <Link to="/clientes/nuevo" className="btn btn-success">Nuevo Cliente</Link>
      </div>

      {clientes.length === 0 ? (
        <p>No hay clientes registrados.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(cliente => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.apellido}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.email}</td>
                <td>
                  <Link to={`/clientes/editar/${cliente.id}`} className="btn btn-warning">
                    Editar
                  </Link>
                  <button 
                    onClick={() => handleDelete(cliente.id)} 
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

export default ClientesList;
