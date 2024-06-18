package com.spring.jpa.service;

import java.util.List;

import com.spring.jpa.entity.Factura;

public interface IFacturaService {
	
	public List<Factura> buscarTodo();
	
	public Factura buscarPorId(Long id);
	
	public Factura guardar(Factura cabecera);
	
	public void eliminar(Long id); 
}
