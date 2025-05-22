import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getClienteById, createCliente, updateCliente } from '../../services/api';

function ClienteForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cliente, setCliente] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    direccion: ''
  });

  const isEditing = !!id;

  useEffect(() => {
    if (isEditing) {
      loadCliente();
    }
  }, [id]);

  const loadCliente = async () => {
    try {
      setLoading(true);
      const clienteData = await getClienteById(id);
      setCliente(clienteData);
      setError(null);
    } catch (err) {
      console.error("Error al cargar el cliente:", err);
      setError("No se pudo cargar la información del cliente.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isEditing) {
        await updateCliente(id, cliente);
      } else {
        await createCliente(cliente);
      }
      navigate('/clientes');
    } catch (err) {
      console.error("Error al guardar el cliente:", err);
      setError("No se pudo guardar el cliente. Verifica los datos e intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) return <div>Cargando...</div>;

  return (
    <div>
      <h1>{isEditing ? 'Editar Cliente' : 'Nuevo Cliente'}</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={cliente.nombre}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={cliente.apellido}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={cliente.telefono}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={cliente.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="direccion">Dirección</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={cliente.direccion || ''}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
          <button 
            type="button" 
            className="btn btn-danger" 
            onClick={() => navigate('/clientes')}
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ClienteForm;
