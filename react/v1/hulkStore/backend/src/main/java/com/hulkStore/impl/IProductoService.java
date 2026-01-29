package com.hulkStore.impl;

import java.util.List;

import com.hulkStore.entity.Producto;

public interface IProductoService {

	public Producto guardar(Producto entity);

	public List<Producto> listar();

	public Producto buscarPorId(Integer productoId);

	public List<Producto> buscarPorDescripcion(String desc);

}
