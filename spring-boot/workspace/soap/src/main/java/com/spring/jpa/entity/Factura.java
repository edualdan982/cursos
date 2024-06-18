package com.spring.jpa.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="facturas")
@Getter
@Setter
public class Factura implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idFactura;
	private Integer nitEmisor;
	@Column(length = 255)
	private String razonSocialEmisor;
	@Column(length = 128)
	private String municipio;
	@Column(length = 16)
	private String telefono;
	private Integer numeroFactura;
	@Column(length = 64)
	private String cuf;
	@Column(length = 64)
	private String cufd;
	private Integer codigoSucursal;
	@Column(length = 64)
	private String direccion;
	private Integer codigoPuntoVenta;
	@Temporal(TemporalType.DATE)
	private Date fechaEmision;
	@Column(length = 255)
	private String nombreRazonSocial;
	@Column(length = 16)
	private String numeroDocumento;
	@Column(length = 4)
	private String complemento;
	private String codigoCliente;
	private Integer codigoMetodoPago;
	@Column(length = 16)
	private String numeroTarjeta;
	@Column(scale = 2)
	private Double montoTotal;
	@Column(scale = 2)
	private Double montoTotalSujetoIva;
	private Integer codigoMoneda;
	private Integer tipoCambio; 
	@Column(scale = 2)
	private Double montoTotalMoneda;
	@Column(scale = 2)
	private Double montoTotalGiftCard;
	@Column(scale = 2)
	private Double descuentoAdicional;
	private Integer codigoExcepcion;
	@Column(length = 8)
	private String cafc;
	@Column(length = 300)
	private String leyenda;
	@Column(length = 16)
	private String usuario;
	private Integer codigoDocumentoSector;
	
	
	private static final long serialVersionUID = 1L;
}
