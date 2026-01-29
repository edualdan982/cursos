package com.hulkStore.dao.auth;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hulkStore.entity.auth.Usuario;

public interface IUsuarioDao extends JpaRepository<Usuario, Integer> {
	@Query(value="SELECT u FROM Usuario u WHERE u.username = :username AND u.estado = 1")
	public Usuario buscarPorUsername(String username);
	
	@Query(value="SELECT u FROM Usuario u WHERE u.username = :username AND u.estado = :estado ")
	public Usuario buscarPorUsername(String username, Boolean estado);
}
