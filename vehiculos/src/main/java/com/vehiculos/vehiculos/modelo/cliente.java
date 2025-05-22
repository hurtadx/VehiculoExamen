package com.vehiculos.vehiculos.modelo;

import jakarta.persistence.*;

@Entity
@Table(name = "cliente")
public class cliente {
    @Id
    private String identificacion;
    private String nombre;
    private String direccion;
    private String telefono;
    private boolean activo = true;

    // Getters y Setters
    public String getIdentificacion() { return identificacion; }
    public void setIdentificacion(String identificacion) { this.identificacion = identificacion; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }
    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }
    public boolean isActivo() { return activo; }
    public void setActivo(boolean activo) { this.activo = activo; }
}
