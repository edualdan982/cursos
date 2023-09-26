package com.spring.boot.backend.apirest.curso.models.dao;



import org.springframework.data.repository.CrudRepository;

import com.spring.boot.backend.apirest.curso.models.entity.Usuario;

public interface IUsuarioDao extends CrudRepository<Usuario, Long>{
	
	public Usuario findByUsername(String username);

}
