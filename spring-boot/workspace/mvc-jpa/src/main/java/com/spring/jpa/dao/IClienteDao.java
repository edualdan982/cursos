package com.spring.jpa.dao;

import java.util.List;

import com.spring.jpa.entity.Cliente;

public interface IClienteDao {

	public List<Cliente> findAll();
}
