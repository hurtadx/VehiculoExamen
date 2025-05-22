import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  getVentaByCodigo, 
  createVenta, 
  updateVenta, 
  getClientes, 
  getVehiculos 
} from '../../services/api';

function VentaForm() {
  const { codigo } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [venta, setVenta] = useState({
    codigo: '',
    fecha: new Date().toISOString().split('T')[0],
    clienteId: '',
    vehiculoPlaca: '',
    monto: '',
    metodo_pago: 'Efectivo'
  });

  const isEditing = !!codigo;

  useEffect(() => {
    loadDependencies();
    if (isEditing) {
      loadVenta();
    }
  }, [codigo]);

  const loadDependencies = async () => {
    try {
      setLoading(true);
      const [clientesData, vehiculosData] = await Promise.all([
        getClientes(),
        getVehiculos()
      ]);
      setClientes(clientesData || []);
      setVehiculos(vehiculosData || []);
    } catch (err) {
      console.error("Error al cargar datos dependientes:", err);
      setError("No se pudieron cargar los datos necesarios para el formulario.");
    } finally {
      setLoading(false);
    }
  };

  const loadVenta = async () => {
    try {
      setLoading(true);
      const ventaData = await getVentaByCodigo(codigo);
      
      if (ventaData) {
        setVenta({
          ...ventaData,
          fecha: ventaData.fecha ? new Date(ventaData.fecha).toISOString().split('T')[0] : '',
          clienteId: ventaData.cliente?.id || '',
          vehiculoPlaca: ventaData.vehiculo?.placa || '',
          monto: ventaData.monto || 0,
          metodo_pago: ventaData.metodo_pago || 'Efectivo'
        });
      }
      
      setError(null);
    } catch (err) {
      console.error("Error al cargar la venta:", err);
      setError("No se pudo cargar la información de la venta.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenta(prev => ({
      ...prev,
      [name]: name === 'monto' ? (value === '' ? '' : parseFloat(value)) : value
    }));
  };

  const handleVehiculoChange = (e) => {
    const placa = e.target.value;
    const vehiculoSeleccionado = vehiculos.find(v => v.placa === placa);
    
    setVenta(prev => ({
      ...prev,
      vehiculoPlaca: placa,
      monto: vehiculoSeleccionado ? vehiculoSeleccionado.precio : prev.monto
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      const ventaData = {
        ...venta,
        cliente: { id: venta.clienteId },
        vehiculo: { placa: venta.vehiculoPlaca }
      };
      
      if (isEditing) {
        await updateVenta(codigo, ventaData);
      } else {
        await createVenta(ventaData);
      }
      navigate('/ventas');
    } catch (err) {
      console.error("Error al guardar la venta:", err);
      setError("No se pudo guardar la venta. Verifica los datos e intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && (isEditing || !clientes.length || !vehiculos.length)) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>{isEditing ? 'Editar Venta' : 'Nueva Venta'}</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        {!isEditing && (
          <div className="form-group">
            <label htmlFor="codigo">Código de Venta</label>
            <input
              type="text"
              id="codigo"
              name="codigo"
              value={venta.codigo || ''}
              onChange={handleChange}
              required
            />
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="fecha">Fecha</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={venta.fecha || ''}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="clienteId">Cliente</label>
          <select
            id="clienteId"
            name="clienteId"
            value={venta.clienteId || ''}
            onChange={handleChange}
            required
          >
            <option value="" key="empty-client">Selecciona un cliente</option>
            {clientes.map(cliente => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombre} {cliente.apellido}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="vehiculoPlaca">Vehículo</label>
          <select
            id="vehiculoPlaca"
            name="vehiculoPlaca"
            value={venta.vehiculoPlaca || ''}
            onChange={handleVehiculoChange}
            required
          >
            <option value="" key="empty-vehicle">Selecciona un vehículo</option>
            {vehiculos.map(vehiculo => (
              <option key={vehiculo.placa} value={vehiculo.placa}>
                {vehiculo.marca} {vehiculo.modelo} - {vehiculo.placa} (${vehiculo.precio || 'N/A'})
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="monto">Monto</label>
          <input
            type="number"
            id="monto"
            name="monto"
            value={venta.monto || ''}
            onChange={handleChange}
            required
            step="0.01"
            min="0"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="metodo_pago">Método de Pago</label>
          <select
            id="metodo_pago"
            name="metodo_pago"
            value={venta.metodo_pago || 'Efectivo'}
            onChange={handleChange}
            required
          >
            <option value="Efectivo">Efectivo</option>
            <option value="Tarjeta de crédito">Tarjeta de crédito</option>
            <option value="Tarjeta de débito">Tarjeta de débito</option>
            <option value="Transferencia bancaria">Transferencia bancaria</option>
            <option value="Financiamiento">Financiamiento</option>
          </select>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
          <button 
            type="button" 
            className="btn btn-danger" 
            onClick={() => navigate('/ventas')}
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default VentaForm;
