import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ClientesList from './pages/clientes/ClientesList';
import ClienteForm from './pages/clientes/ClienteForm';
import VehiculosList from './pages/vehiculos/VehiculosList';
import VehiculoForm from './pages/vehiculos/VehiculoForm';
import VentasList from './pages/ventas/VentasList';
import VentaForm from './pages/ventas/VentaForm';

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/clientes" element={<ClientesList />} />
          <Route path="/clientes/nuevo" element={<ClienteForm />} />
          <Route path="/clientes/editar/:id" element={<ClienteForm />} />
          
          <Route path="/vehiculos" element={<VehiculosList />} />
          <Route path="/vehiculos/nuevo" element={<VehiculoForm />} />
          <Route path="/vehiculos/editar/:placa" element={<VehiculoForm />} />
          
          <Route path="/ventas" element={<VentasList />} />
          <Route path="/ventas/nueva" element={<VentaForm />} />
          <Route path="/ventas/editar/:codigo" element={<VentaForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
