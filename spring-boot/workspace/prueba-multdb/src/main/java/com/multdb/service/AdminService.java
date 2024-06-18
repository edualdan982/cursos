package com.multdb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.multdb.entitys.postgres.Admin;
import com.multdb.repo.postgres.IAdminDao;

@Service
public class AdminService {

	@Autowired
	private IAdminDao repo;
	
	@Transactional("mysqlTransacctionManagerRef")
	public void registrar(Admin t) {
		repo.save(t);
	}
}
