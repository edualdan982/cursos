package com.spring.boot.backend.apirest.curso.models.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.spring.boot.backend.apirest.curso.models.entity.Estudiante;

public interface IEstudianteService {
	
	public List<Estudiante> findAll();
	
	public Page<Estudiante> findAll(Pageable pageable);
	
	public Estudiante findById(Long id);
	
	public Estudiante save(Estudiante estudiante);
	
	public void delete(Long id);
	
}
