package com.multdb.repo.postgres;

import org.springframework.data.jpa.repository.JpaRepository;

import com.multdb.entitys.postgres.Admin;


public interface IAdminDao extends JpaRepository<Admin, Integer> {

}
