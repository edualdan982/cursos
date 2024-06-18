package com.spring.jpa.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.spring.jpa.entity.Factura;
import com.spring.jpa.service.IFacturaService;

@Controller
public class FacturaController {
	@Autowired
	private IFacturaService facturaService;
	
	@RequestMapping(value = {"/factura"}, method = RequestMethod.GET)
	public String listarFactura(@RequestParam(name = "id", defaultValue = "0") long id, Model model) {
		List<Factura> facturas = facturaService.buscarTodo();
		model.addAttribute("facturas", facturas);
		
		return "factura";
	}
}
