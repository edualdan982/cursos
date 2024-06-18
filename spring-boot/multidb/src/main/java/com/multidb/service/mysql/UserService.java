package com.multidb.service.mysql;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.multidb.entity.mysql.User;
import com.multidb.idao.mysql.IUserDao;
import com.multidb.impl.mysql.IUserService;

@Service
public class UserService implements IUserService {

	@Autowired
	private IUserDao userDao;

	@Transactional(readOnly = true, transactionManager = "mysqlTrasactionManager")
	@Override
	public List<User> listarTodo() {
		return userDao.findAll();
	}

	@Transactional(transactionManager = "mysqlTrasactionManager")
	@Override
	public User guardar(User entity) {
		return userDao.save(entity);
	}

}
