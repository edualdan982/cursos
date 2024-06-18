package com.spring.jpa.controller;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.security.GeneralSecurityException;
import java.security.PrivateKey;
import java.security.cert.X509Certificate;
import java.util.HashMap;
import java.util.Map;

import javax.xml.parsers.ParserConfigurationException;

import org.apache.xml.security.exceptions.XMLSecurityException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.xml.sax.SAXException;

import com.spring.jpa.service.IAdmFileService;
import com.spring.jpa.xml.Firmador;

@RestController
@RequestMapping("/firma")
public class FirmaXmlController {
	private final static Logger LOGGER = LoggerFactory.getLogger(FirmaXmlController.class);

	@Autowired
	private IAdmFileService fileService;

	@GetMapping()
	public ResponseEntity<?> firmarXml() {
		Map<String, Object> response = new HashMap<>();
		File recurso = null;
		String data = null;

		String respuesta = null;
		try {
			recurso = new File("C:\\Users\\DTIC\\AppData\\Local\\Temp\\archivo1408422866548967972.xml");
			if (recurso.exists()) {
				data = new String(Files.readAllBytes(recurso.toPath()));
				response.put("xmlOriginal", data);
				byte[] datos = data.getBytes(StandardCharsets.UTF_8);

				PrivateKey privateKey = Firmador.getPrivateKey("/certsFirma/privatekey.pem");

				X509Certificate cert = Firmador.getX509Certificate("/certsFirma/sscert.cert", "X.509");

				byte[] xmlFirmado = Firmador.firmarDsig(datos, privateKey, cert);

				respuesta = new String(xmlFirmado);
				response.put("xmlFirmado", respuesta);
			}else
				response.put("mensaje", "No existe el XML para firmar.");

		} catch (IOException | GeneralSecurityException | ParserConfigurationException | SAXException
				| XMLSecurityException ex) {
			LOGGER.error(ex.getMessage());
			return new ResponseEntity<String>(ex.getCause().toString(), HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}

	@GetMapping("/path")
	public ResponseEntity<?> recursos() {
		Map<String, Object> response = new HashMap<>();

		try {
			response.put("1", fileService.rutaRecursoEstatico("/certsFirma/privateKey.pem"));
			response.put("2", fileService.rutaProyecto());

		} catch (IOException e) {
			LOGGER.error(e.getCause().toString());
		}

		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}
}
