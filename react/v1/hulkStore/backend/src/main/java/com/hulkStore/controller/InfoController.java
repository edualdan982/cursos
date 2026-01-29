package com.hulkStore.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InfoController {

	private static final Logger log = LoggerFactory.getLogger(InfoController.class);
	
	@Autowired
	private BCryptPasswordEncoder bcryptEncoder;
	
	@GetMapping("/estado")
	public ResponseEntity<?> estadoServicio(){
		log.info("Consumo-api: Estado del servicio");
		Map<String, Object> response = new HashMap<>();
		response.put("estado", true);
		response.put("mensaje", "El servicio esta funcionando correctamente.");
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@GetMapping("/clave")
	public ResponseEntity<?> generarClave(@RequestParam(required = false) String clave){
		log.info("Consumo-api: Generar Clave");
		Map<String, Object> response = new HashMap<>();
		response.put("estado", false);
		response.put("clave", null);
		
		if(clave == null) {
			response.put("mensaje", "Se debe enviar el parametro: clave");
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}
		response.put("estado", true);
		response.put("clave", bcryptEncoder.encode(clave));
		response.put("mensaje", "Se ha encriptado la clave correctamente.");
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
}
