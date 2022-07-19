package com.spring.boot.backend.apirest.curso.models.services;

import com.spring.boot.backend.apirest.curso.models.entity.Usuario;

public interface IUsuarioService {
	public Usuario findByUsername(String username);
}
