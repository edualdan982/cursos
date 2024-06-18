package com.spring.jpa.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.jpa.dao.IMovieDao;
import com.spring.jpa.entity.MovieEntity;
import com.spring.jpa.service.IMovieService;

@Service
public class MovieServiceImpl implements IMovieService {
	@Autowired
	private IMovieDao movieDao;

	@Transactional(readOnly = true)
	@Override
	public List<MovieEntity> listarTodo() {
		return (List<MovieEntity>) movieDao.findAll();
	}
	@Transactional
	@Override
	public MovieEntity guardar(MovieEntity movie) {
		return movieDao.save(movie);
	}
	
	@Transactional
	@Override
	public boolean actualizar(MovieEntity movie) {
		try {
			movieDao.save(movie);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	@Transactional(readOnly = true)
	@Override
	public MovieEntity buscarPorId(Long id) {
		return movieDao.findById(id).orElse(null);
	}
	
	@Transactional(readOnly = true)
	@Override
	public MovieEntity buscarPorTitulo(String title) {
		return movieDao.findByTitle(title);
	}

	@Transactional
	@Override
	public boolean eliminarPorId(Long id) {
		try {
			movieDao.deleteById(id);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

}
