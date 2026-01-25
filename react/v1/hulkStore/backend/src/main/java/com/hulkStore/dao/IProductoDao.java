package com.hulkStore.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hulkStore.entity.Producto;

public interface IProductoDao extends JpaRepository<Producto, Integer>{
	
	@Query(value = "SELECT p FROM Producto p WHERE lower(p.descripcion) like :desc")
	public List<Producto> buscarPorDescripcion(String desc);

}
