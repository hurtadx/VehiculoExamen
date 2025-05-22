package com.vehiculos.vehiculos.modelo;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "venta")
public class venta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;
    private LocalDate fecha;

    @ManyToOne
    @JoinColumn(name = "cliente_id", referencedColumnName = "identificacion")
    private cliente cliente;

    @ManyToOne
    @JoinColumn(name = "vehiculo_placa", referencedColumnName = "placa")
    private vehiculo vehiculo;

    // Getters y Setters
    public Long getCodigo() { return codigo; }
    public void setCodigo(Long codigo) { this.codigo = codigo; }
    public LocalDate getFecha() { return fecha; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }
    public cliente getCliente() { return cliente; }
    public void setCliente(cliente cliente) { this.cliente = cliente; }
    public vehiculo getVehiculo() { return vehiculo; }
    public void setVehiculo(vehiculo vehiculo) { this.vehiculo = vehiculo; }
}
