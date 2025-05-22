package com.vehiculos.vehiculos.repositorio;

import com.vehiculos.vehiculos.modelo.vehiculo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface vehiculoRepositorio extends JpaRepository<vehiculo, String> {
}
