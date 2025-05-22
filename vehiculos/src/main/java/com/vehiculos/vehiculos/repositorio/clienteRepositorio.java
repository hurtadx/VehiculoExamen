package com.vehiculos.vehiculos.repositorio;

import com.vehiculos.vehiculos.modelo.cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface clienteRepositorio extends JpaRepository<cliente, String> {
}
