package com.spring.jpa.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.JAXBException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.jpa.entity.Factura;
import com.spring.jpa.service.IFacturaService;
import com.spring.jpa.xml.FacturaList;
import com.spring.jpa.xml.ConvertirdorXml;

@Controller
@RequestMapping("/rest")
public class XmlFacturaController {

	@Autowired
	private IFacturaService facturaService;

	@ResponseBody
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Object listarXml(@PathVariable Long id, HttpServletRequest http) {
		String format = null;
		format = http.getParameter("format");
		if (format == null)
			return "Error en el formato de la peticion, concatene a su URL: URL?format=xml|json";

		Factura factura = null;
		ConvertirdorXml<FacturaList> converterXML = null;
		if (format.equals("xml")) {
			factura = facturaService.buscarPorId(id);
			FacturaList clase = new FacturaList(factura, factura.getDetalle());

			try {
				converterXML = new ConvertirdorXml<FacturaList>(clase, "facturaComputarizadaCompraVenta.xsd", "utf-8");
				converterXML.convertir();
				System.out.println(converterXML.obtenerTempFilePath());
			} catch (JAXBException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}

			return converterXML.result.toString();
		} else {
			factura = facturaService.buscarPorId(id);
			return factura == null ? "No existe la FACTURA" : factura;
		}

	}
}
