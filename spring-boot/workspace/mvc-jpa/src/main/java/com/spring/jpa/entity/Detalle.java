package com.spring.jpa.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "DETALLES")
@Getter
@Setter
public class Detalle implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idDetalle;

	private Integer actividadEconomica;
	private Integer codigoProductoSin;
	private Integer codigoProducto;
	@Column(length = 128)
	private String descripcion;
	private Integer cantidad;
	private Integer unidadMedida;
	@Column(scale = 2)
	private Double precioUnitario;
	@Column(scale = 2)
	private Double montoDescuento;
	@Column(scale = 2)
	private Double subTotal;
	private Integer numeroSerie;
	@Column(length = 32)
	private String numeroImei;
	
	private static final long serialVersionUID = 1L;

}
