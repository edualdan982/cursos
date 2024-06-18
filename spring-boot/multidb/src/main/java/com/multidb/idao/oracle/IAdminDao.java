package com.multidb.idao.oracle;

import org.springframework.data.jpa.repository.JpaRepository;

import com.multidb.entity.oracle.Admin;

public interface IAdminDao extends JpaRepository<Admin, Integer> {

}
