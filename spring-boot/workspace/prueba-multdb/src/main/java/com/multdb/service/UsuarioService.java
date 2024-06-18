package com.multdb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.multdb.entitys.mysql.Usuario;
import com.multdb.repo.mysql.IUsuarioDao;

@Service
public class UsuarioService {

	@Autowired
	private IUsuarioDao repo;
	
	public void registrar(Usuario t) {
		repo.save(t);
	}
}
