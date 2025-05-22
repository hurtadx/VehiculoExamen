package com.vehiculos.vehiculos.controlador;

import com.vehiculos.vehiculos.modelo.vehiculo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.vehiculos.vehiculos.servicio.vehiculoServicio;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/vehiculos")
public class vehiculoControlador {
    @Autowired
    private vehiculoServicio servicio;

    @GetMapping
    public List<vehiculo> listarTodos() {
        return servicio.listarTodos();
    }

    @GetMapping("/{placa}")
    public Optional<vehiculo> buscarPorId(@PathVariable String placa) {
        return servicio.buscarPorId(placa);
    }

    @PostMapping
    public vehiculo guardar(@RequestBody vehiculo v) {
        return servicio.guardar(v);
    }

    @PutMapping("/{placa}")
    public vehiculo actualizar(@PathVariable String placa, @RequestBody vehiculo v) {
        v.setPlaca(placa);
        return servicio.guardar(v);
    }

    @DeleteMapping("/{placa}")
    public void eliminar(@PathVariable String placa) {
        servicio.eliminar(placa);
    }
}
