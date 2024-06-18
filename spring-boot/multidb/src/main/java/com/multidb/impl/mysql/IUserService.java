package com.multidb.impl.mysql;

import java.util.List;

import com.multidb.entity.mysql.User;

public interface IUserService {
	
	public List<User> listarTodo();
	
	public User guardar(User entity);
}
