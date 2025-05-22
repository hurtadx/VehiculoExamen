package com.vehiculos.vehiculos.servicio;

import com.vehiculos.vehiculos.modelo.cliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.vehiculos.vehiculos.repositorio.clienteRepositorio;
import java.util.List;
import java.util.Optional;

@Service
public class clienteVehiculo {
    @Autowired
    private clienteRepositorio clienteRepo;

    public List<cliente> listarTodos() {
        return clienteRepo.findAll();
    }

    public Optional<cliente> buscarPorId(String id) {
        return clienteRepo.findById(id);
    }

    public cliente guardar(cliente c) {
        return clienteRepo.save(c);
    }

    public void eliminar(String id) {
        clienteRepo.deleteById(id);
    }
}
