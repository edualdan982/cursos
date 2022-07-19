package com.spring.boot.backend.apirest.curso.models.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.spring.boot.backend.apirest.curso.models.entity.Curso;
import com.spring.boot.backend.apirest.curso.models.entity.Docente;

public interface IDocenteServiceImpl {
	
	public List<Docente> findAll();
	
	public Page<Docente> findAll(Pageable pageable);
	
	public Docente findById(Long id);
	
	public Docente save(Docente Docente);
	
	public void delete(Long id);
	
	public List<Curso> findAllCursos();
}
