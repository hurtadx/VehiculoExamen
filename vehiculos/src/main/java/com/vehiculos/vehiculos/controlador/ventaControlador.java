package com.vehiculos.vehiculos.controlador;

import com.vehiculos.vehiculos.modelo.venta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.vehiculos.vehiculos.servicio.ventaServicio;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ventas")
public class ventaControlador {
    @Autowired
    private ventaServicio servicio;

    @GetMapping
    public List<venta> listarTodos() {
        return servicio.listarTodos();
    }

    @GetMapping("/{codigo}")
    public Optional<venta> buscarPorId(@PathVariable Long codigo) {
        return servicio.buscarPorId(codigo);
    }

    @PostMapping
    public venta guardar(@RequestBody venta v) {
        return servicio.guardar(v);
    }

    @PutMapping("/{codigo}")
    public venta actualizar(@PathVariable Long codigo, @RequestBody venta v) {
        v.setCodigo(codigo);
        return servicio.guardar(v);
    }

    @DeleteMapping("/{codigo}")
    public void eliminar(@PathVariable Long codigo) {
        servicio.eliminar(codigo);
    }
}
