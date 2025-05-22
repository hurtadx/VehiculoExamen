package com.vehiculos.vehiculos;

import org.springframework.boot.SpringApplication;

public class TestVehiculosApplication {

	public static void main(String[] args) {
		SpringApplication.from(VehiculosApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
