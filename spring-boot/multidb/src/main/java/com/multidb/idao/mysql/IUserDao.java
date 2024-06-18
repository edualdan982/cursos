package com.multidb.idao.mysql;

import org.springframework.data.jpa.repository.JpaRepository;

import com.multidb.entity.mysql.User;

public interface IUserDao extends JpaRepository<User, Integer> {

}
