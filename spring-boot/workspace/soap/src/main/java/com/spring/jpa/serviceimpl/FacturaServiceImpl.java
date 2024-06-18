package com.spring.jpa.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.jpa.dao.ICabeceraDao;
import com.spring.jpa.entity.Factura;
import com.spring.jpa.service.IFacturaService;

@Service
public class FacturaServiceImpl implements IFacturaService {

	@Autowired
	private ICabeceraDao cabeceraDao;
	
	@Transactional(readOnly = true)
	@Override
	public List<Factura> buscarTodo() {
		return (List<Factura>)cabeceraDao.findAll();
	}
	
	@Transactional(readOnly = true)
	@Override
	public Factura buscarPorId(Long id) {
		return cabeceraDao.findById(id).orElse(null);
	}
	@Transactional
	@Override
	public Factura guardar(Factura cabecera) {
		return cabeceraDao.save(cabecera);
	}
	@Transactional
	@Override
	public void eliminar(Long id) {
		cabeceraDao.deleteById(id);
	}

}
