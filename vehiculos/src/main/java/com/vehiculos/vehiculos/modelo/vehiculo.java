package com.vehiculos.vehiculos.modelo;

import jakarta.persistence.*;

@Entity
@Table(name = "vehiculo")
public class vehiculo {
    @Id
    private String placa;
    private String marca;
    private String modelo;
    private Double valor;
    private boolean activo = true;

    // Getters y Setters
    public String getPlaca() { return placa; }
    public void setPlaca(String placa) { this.placa = placa; }
    public String getMarca() { return marca; }
    public void setMarca(String marca) { this.marca = marca; }
    public String getModelo() { return modelo; }
    public void setModelo(String modelo) { this.modelo = modelo; }
    public Double getValor() { return valor; }
    public void setValor(Double valor) { this.valor = valor; }
    public boolean isActivo() { return activo; }
    public void setActivo(boolean activo) { this.activo = activo; }
}
