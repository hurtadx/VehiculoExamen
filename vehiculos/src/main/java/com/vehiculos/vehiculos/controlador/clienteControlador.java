package com.vehiculos.vehiculos.controlador;

import com.vehiculos.vehiculos.modelo.cliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.vehiculos.vehiculos.servicio.clienteVehiculo;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/clientes")
public class clienteControlador {
    @Autowired
    private clienteVehiculo servicio;

    @GetMapping
    public List<cliente> listarTodos() {
        return servicio.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<cliente> buscarPorId(@PathVariable String id) {
        return servicio.buscarPorId(id);
    }

    @PostMapping
    public cliente guardar(@RequestBody cliente c) {
        return servicio.guardar(c);
    }

    @PutMapping("/{id}")
    public cliente actualizar(@PathVariable String id, @RequestBody cliente c) {
        c.setIdentificacion(id);
        return servicio.guardar(c);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable String id) {
        servicio.eliminar(id);
    }
}
