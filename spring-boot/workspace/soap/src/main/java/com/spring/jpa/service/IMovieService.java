package com.spring.jpa.service;

import java.util.List;
import com.spring.jpa.entity.MovieEntity;

public interface IMovieService {
	public List<MovieEntity> listarTodo();

	public MovieEntity guardar(MovieEntity movie);
	
	public boolean actualizar(MovieEntity movie);

	public MovieEntity buscarPorId(Long id);
	
	public MovieEntity buscarPorTitulo(String title);

	public boolean eliminarPorId(Long id);
}
