package com.vehiculos.vehiculos.servicio;

import com.vehiculos.vehiculos.modelo.vehiculo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.vehiculos.vehiculos.repositorio.vehiculoRepositorio;
import java.util.List;
import java.util.Optional;

@Service
public class vehiculoServicio {
    @Autowired
    private vehiculoRepositorio vehiculoRepo;

    public List<vehiculo> listarTodos() {
        return vehiculoRepo.findAll();
    }

    public Optional<vehiculo> buscarPorId(String placa) {
        return vehiculoRepo.findById(placa);
    }

    public vehiculo guardar(vehiculo v) {
        return vehiculoRepo.save(v);
    }

    public void eliminar(String placa) {
        vehiculoRepo.deleteById(placa);
    }
}
