package com.multdb.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.multdb.entitys.mysql.Usuario;
import com.multdb.entitys.postgres.Admin;
import com.multdb.service.AdminService;
import com.multdb.service.UsuarioService;

@RestController
@RequestMapping("/test")
public class TestController {

	@Autowired
	private AdminService adminService;

	@Autowired
	private UsuarioService usuarioService;

	@PostMapping("/admin")
	public ResponseEntity<?> registrarAdmin(@RequestBody Admin t) {
		Map<String, Object> response = new HashMap<>();
		response.put("respuesta", t);
		adminService.registrar(t);

		response.put("ok", "Se ha creado con exito");

		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}

	@PostMapping("/usuario")
	public ResponseEntity<?> registrarAdmin(@RequestBody Usuario t) {
		Map<String, Object> response = new HashMap<>();
		response.put("respuesta", t);
		usuarioService.registrar(t);
		response.put("ok", "Se ha creado con exito");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}

}
