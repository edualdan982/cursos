package com.multdb.repo.mysql;

import org.springframework.data.jpa.repository.JpaRepository;

import com.multdb.entitys.mysql.Usuario;

public interface IUsuarioDao extends JpaRepository<Usuario, Integer>{

}
