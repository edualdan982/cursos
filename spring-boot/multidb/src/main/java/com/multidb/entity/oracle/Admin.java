package com.multidb.entity.oracle;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import java.io.Serializable;

import javax.persistence.Column;

@Entity
@Table(name = "DAN_ADMIN")
public class Admin implements Serializable {

	@Id
	private Integer id;

	@Column(length = 128)
	private String nombres;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNombres() {
		return nombres;
	}

	public void setNombres(String nombres) {
		this.nombres = nombres;
	}

	private static final long serialVersionUID = 1L;
}
