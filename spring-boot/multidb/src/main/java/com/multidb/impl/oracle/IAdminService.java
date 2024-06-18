package com.multidb.impl.oracle;

import java.util.List;

import com.multidb.entity.oracle.Admin;

public interface IAdminService {

	public List<Admin> listarTodo();

	public Admin guardar(Admin entity);
}
