package com.vehiculos.vehiculos.repositorio;

import com.vehiculos.vehiculos.modelo.venta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ventaRepositorio extends JpaRepository<venta, Long> {
}
