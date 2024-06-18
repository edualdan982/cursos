package com.spring.jpa.dao;

import org.springframework.data.repository.CrudRepository;

import com.spring.jpa.entity.Factura;

public interface IFacturaDao extends CrudRepository<Factura, Long>{

}
