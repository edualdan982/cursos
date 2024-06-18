package com.spring.jpa.controllers;

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
	
	@RequestMapping(value = {"/listar"}, method = RequestMethod.GET)
	public String listarFactura(@RequestParam(name = "id", defaultValue = "0") long id, Model model) {
		Factura factura = facturaService.buscarPorId(id);
		model.addAttribute("factura", factura);
		return "factura";
	}
}
