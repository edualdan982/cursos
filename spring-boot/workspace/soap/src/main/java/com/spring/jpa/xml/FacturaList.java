package com.spring.jpa.xml;

import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import com.spring.jpa.entity.Factura;

@XmlRootElement(name = "facturaComputarizadaCompraVenta")
public class FacturaList {
	@XmlElement(name = "cabecera")
	public List<Factura> facturas;

	public FacturaList() {
	}

	public FacturaList(List<Factura> facturas) {
		this.facturas = facturas;
	}

	public List<Factura> getFacturas() {
		return facturas;
	}

}
