package com.spring.jpa.xml;

import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import com.spring.jpa.entity.Detalle;
import com.spring.jpa.entity.Factura;

import lombok.Getter;

@XmlRootElement(name = "facturaComputarizadaCompraVenta")
@Getter
public class FacturaList {

	@XmlElement(name = "cabecera")
	public Factura facturas;
	@XmlElement(name = "detalle")
	public List<Detalle> detalles;

	public FacturaList() {
	}

	public FacturaList(Factura facturas) {
		this.facturas = facturas;
	}

	public FacturaList(List<Detalle> detalles) {
		this.detalles = detalles;
	}

	public FacturaList(Factura facturas, List<Detalle> detalles) {
		this.facturas = facturas;
		this.detalles = detalles;
	}

}
