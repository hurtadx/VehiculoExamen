package com.vehiculos.vehiculos.servicio;

import com.vehiculos.vehiculos.modelo.venta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.vehiculos.vehiculos.repositorio.ventaRepositorio;
import java.util.List;
import java.util.Optional;

@Service
public class ventaServicio {
    @Autowired
    private ventaRepositorio ventaRepo;

    public List<venta> listarTodos() {
        return ventaRepo.findAll();
    }

    public Optional<venta> buscarPorId(Long codigo) {
        return ventaRepo.findById(codigo);
    }

    public venta guardar(venta v) {
        return ventaRepo.save(v);
    }

    public void eliminar(Long codigo) {
        ventaRepo.deleteById(codigo);
    }
}
