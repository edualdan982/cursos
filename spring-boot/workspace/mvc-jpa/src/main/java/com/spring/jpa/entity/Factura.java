package com.spring.jpa.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlTransient;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "facturas")
@Setter
public class Factura implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Getter
	private Long idFactura;
	@Getter
	private Integer nitEmisor;
	@Column(length = 255)
	@Getter
	private String razonSocialEmisor;
	@Column(length = 128)
	@Getter
	private String municipio;
	@Column(length = 16)
	@Getter
	private String telefono;
	@Getter
	private Integer numeroFactura;
	@Column(length = 64)
	@Getter
	private String cuf;
	@Column(length = 64)
	@Getter
	private String cufd;
	@Getter
	private Integer codigoSucursal;
	@Column(length = 64)
	@Getter
	private String direccion;
	@Getter
	private Integer codigoPuntoVenta;
	@Temporal(TemporalType.TIMESTAMP)
	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "America/La_Paz")
	@Getter
	private Date fechaEmision;
	@Column(length = 255)
	@Getter
	private String nombreRazonSocial;
	@Column(length = 16)
	@Getter
	private String numeroDocumento;
	@Column(length = 4)
	@Getter
	private String complemento;
	@Getter
	private String codigoCliente;
	@Getter
	private Integer codigoMetodoPago;
	@Column(length = 16)
	@Getter
	private String numeroTarjeta;
	@Column(scale = 2)
	@Getter
	private Double montoTotal;
	@Column(scale = 2)
	@Getter
	private Double montoTotalSujetoIva;
	@Getter
	private Integer codigoMoneda;
	@Getter
	private Integer tipoCambio;
	@Column(scale = 2)
	@Getter
	private Double montoTotalMoneda;
	@Column(scale = 2)
	@Getter
	private Double montoTotalGiftCard;
	@Column(scale = 2)
	@Getter
	private Double descuentoAdicional;
	@Getter
	private Integer codigoExcepcion;
	@Column(length = 8)
	@Getter
	private String cafc;
	@Column(length = 300)
	@Getter
	private String leyenda;
	@Column(length = 16)
	@Getter
	private String usuario;
	@Getter
	private Integer codigoDocumentoSector;

//	@JsonIgnoreProperties(value={"detalle", "hibernateLazyInitializer", "handler"}, allowSetters=true)
//	Agregar la propiedad de arriba si a la Entidad especificamente a este atributo se le anida mas relaciones
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "id_factura", foreignKey = @ForeignKey(name = "ACUARIO_FK_SIN_DETALLE"))
	private List<Detalle> detalle = new ArrayList<>();

	@XmlTransient
	public List<Detalle> getDetalle() {
		return detalle;
	}

	private static final long serialVersionUID = 1L;
}
