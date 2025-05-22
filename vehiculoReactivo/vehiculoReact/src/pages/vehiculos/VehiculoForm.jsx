import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVehiculoByPlaca, createVehiculo, updateVehiculo } from '../../services/api';

function VehiculoForm() {
  const { placa } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [vehiculo, setVehiculo] = useState({
    placa: '',
    marca: '',
    modelo: '',
    año: '',
    color: '',
    precio: ''
  });

  const isEditing = !!placa;

  useEffect(() => {
    if (isEditing) {
      loadVehiculo();
    }
  }, [placa]);

  const loadVehiculo = async () => {
    try {
      setLoading(true);
      const vehiculoData = await getVehiculoByPlaca(placa);
      setVehiculo(vehiculoData);
      setError(null);
    } catch (err) {
      console.error("Error al cargar el vehículo:", err);
      setError("No se pudo cargar la información del vehículo.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehiculo(prev => ({
      ...prev,
      [name]: name === 'precio' ? parseFloat(value) || '' : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isEditing) {
        await updateVehiculo(placa, vehiculo);
      } else {
        await createVehiculo(vehiculo);
      }
      navigate('/vehiculos');
    } catch (err) {
      console.error("Error al guardar el vehículo:", err);
      setError("No se pudo guardar el vehículo. Verifica los datos e intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) return <div>Cargando...</div>;

  return (
    <div>
      <h1>{isEditing ? 'Editar Vehículo' : 'Nuevo Vehículo'}</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="placa">Placa</label>
          <input
            type="text"
            id="placa"
            name="placa"
            value={vehiculo.placa}
            onChange={handleChange}
            required
            disabled={isEditing}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="marca">Marca</label>
          <input
            type="text"
            id="marca"
            name="marca"
            value={vehiculo.marca}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="modelo">Modelo</label>
          <input
            type="text"
            id="modelo"
            name="modelo"
            value={vehiculo.modelo}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="año">Año</label>
          <input
            type="number"
            id="año"
            name="año"
            value={vehiculo.año}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="color">Color</label>
          <input
            type="text"
            id="color"
            name="color"
            value={vehiculo.color || ''}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="precio">Precio</label>
          <input
            type="number"
            id="precio"
            name="precio"
            value={vehiculo.precio}
            onChange={handleChange}
            required
            step="0.01"
            min="0"
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
          <button 
            type="button" 
            className="btn btn-danger" 
            onClick={() => navigate('/vehiculos')}
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default VehiculoForm;
