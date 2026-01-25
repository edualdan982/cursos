package com.hulkStore.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "VENTA")
public class Venta implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idVenta;

	private String razonSocial;

	private String numeroDocumento;

	private Double total;

	@JsonIgnoreProperties(value = { "productos", "hibernateLazyInitializer", "handler" }, allowSetters = true)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "idVenta", foreignKey = @ForeignKey(name = "VENTA_DETALLE_FK"))
	private List<Detalle> productos;

	public Integer getIdVenta() {
		return idVenta;
	}

	public void setIdVenta(Integer idVenta) {
		this.idVenta = idVenta;
	}

	public String getRazonSocial() {
		return razonSocial;
	}

	public void setRazonSocial(String razonSocial) {
		this.razonSocial = razonSocial;
	}

	public String getNumeroDocumento() {
		return numeroDocumento;
	}

	public void setNumeroDocumento(String numeroDocumento) {
		this.numeroDocumento = numeroDocumento;
	}

	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
		this.total = total;
	}

	public List<Detalle> getProductos() {
		return productos;
	}

	public void setProductos(List<Detalle> productos) {
		this.productos = productos;
	}

	private static final long serialVersionUID = 1L;
}
