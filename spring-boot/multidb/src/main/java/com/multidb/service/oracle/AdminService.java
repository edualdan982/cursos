package com.multidb.service.oracle;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.multidb.entity.oracle.Admin;
import com.multidb.idao.oracle.IAdminDao;
import com.multidb.impl.oracle.IAdminService;

@Service
public class AdminService implements IAdminService {
	@Autowired
	private IAdminDao adminDao;

	@Transactional(readOnly = true, transactionManager = "oracleTrasactionManager")
	@Override
	public List<Admin> listarTodo() {
		return adminDao.findAll();
	}

	@Transactional(transactionManager = "oracleTrasactionManager")
	@Override
	public Admin guardar(Admin entity) {
		return adminDao.save(entity);
	}

}
