package com.multidb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.multidb.entity.mysql.User;
import com.multidb.entity.oracle.Admin;
import com.multidb.impl.mysql.IUserService;
import com.multidb.impl.oracle.IAdminService;

@RestController
@RequestMapping("/test")
public class TestController {

	@Autowired
	private IAdminService adminService;
	@Autowired
	private IUserService userService;

	@GetMapping("/user")
	public List<User> listarUser() {
		return userService.listarTodo();
	}

	@PostMapping("/user")
	public User guardarUser(@RequestBody User user) {
		return userService.guardar(user);
	}

	@GetMapping("/admin")
	public List<Admin> listarAdmin() {
		return adminService.listarTodo();
	}

	@PostMapping("/admin")
	public Admin guardarAdmin(@RequestBody Admin admin) {
		return adminService.guardar(admin);
	}
}
