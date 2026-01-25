package com.hulkStore.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hulkStore.dao.IProductoDao;
import com.hulkStore.entity.Producto;
import com.hulkStore.impl.IProductoService;

@Service
public class ProductoService implements IProductoService {
	private static final Logger log = LoggerFactory.getLogger(ProductoService.class);
	@Autowired
	private IProductoDao productoDao;

	@Transactional
	@Override
	public Producto guardar(Producto entity) {
		return productoDao.save(entity);
	}

	@Transactional(readOnly = true)
	@Override
	public List<Producto> listar() {
		return productoDao.findAll();
	}

	@Transactional(readOnly = true)
	@Override
	public Producto buscarPorId(Integer productoId) {
		return productoDao.findById(productoId).orElse(null);
	}

	@Transactional(readOnly = true)
	@Override
	public List<Producto> buscarPorDescripcion(String desc) {
		if (desc != null) {
			desc = "%" + desc.toLowerCase().trim() + "%";
			log.info("Buscando el producto: "+desc);
			return productoDao.buscarPorDescripcion(desc);
		} else
			return null;

	}

}
