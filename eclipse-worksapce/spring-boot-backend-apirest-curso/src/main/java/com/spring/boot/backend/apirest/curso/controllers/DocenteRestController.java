package com.spring.boot.backend.apirest.curso.controllers;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.spring.boot.backend.apirest.curso.models.entity.Docente;
import com.spring.boot.backend.apirest.curso.models.services.IDocenteServiceImpl;
import com.spring.boot.backend.apirest.curso.models.services.IUploadFileService;


@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
@RequestMapping("/curso")
public class DocenteRestController {

	@Autowired
	private IDocenteServiceImpl docenteService;
	
	@Autowired
	private IUploadFileService uploadService;
	
	// private final Logger log = LoggerFactory.getLogger(ClienteRestController.class);

	@GetMapping("/docentes")
	public List<Docente> index() {
		return docenteService.findAll();
	}
	
	@GetMapping("/clientes/page/{page}")
	public Page<Docente> index(@PathVariable Integer page) {
		Pageable pageable = PageRequest.of(page, 4);
		return docenteService.findAll(pageable);
	}
	
	@Secured({"ROLE_ADMIN", "ROLE_USER"})
	@GetMapping("/docentes/{id}")
	public ResponseEntity<?> show(@PathVariable Long id) {
		
		Docente docente = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			docente = docenteService.findById(id);
		} catch(DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(docente == null) {
			response.put("mensaje", "El docente ID: ".concat(id.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<Docente>(docente, HttpStatus.OK);
	}
	
	@Secured("ROLE_ADMIN")
	@PostMapping("/docentes")
	public ResponseEntity<?> create(@Valid @RequestBody Docente docente, BindingResult result) {
		
		Docente docenteNew = null;
		Map<String, Object> response = new HashMap<>();
		
		if(result.hasErrors()) {

			List<String> errors = result.getFieldErrors()
					.stream()
					.map(err -> "El campo '" + err.getField() +"' "+ err.getDefaultMessage())
					.collect(Collectors.toList());
			
			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		try {
			docenteNew = docenteService.save(docente);
		} catch(DataAccessException e) {
			response.put("mensaje", "Error al realizar el insert en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El docente ha sido creado con éxito!");
		response.put("docente", docenteNew);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@Secured("ROLE_ADMIN")
	@PutMapping("/docentes/{id}")
	public ResponseEntity<?> update(@Valid @RequestBody Docente docente, BindingResult result, @PathVariable Long id) {

		Docente docenteActual = docenteService.findById(id);

		Docente docenteUpdated = null;

		Map<String, Object> response = new HashMap<>();

		if(result.hasErrors()) {

			List<String> errors = result.getFieldErrors()
					.stream()
					.map(err -> "El campo '" + err.getField() +"' "+ err.getDefaultMessage())
					.collect(Collectors.toList());
			
			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		if (docenteActual == null) {
			response.put("mensaje", "Error: no se pudo editar, el docente ID: "
					.concat(id.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}

		try {

			docenteActual.setPaterno(docente.getPaterno());
			docenteActual.setMaterno(docente.getMaterno());
			docenteActual.setNombres(docente.getNombres());
			docenteActual.setEmail(docente.getEmail());

			docenteUpdated = docenteService.save(docenteActual);

		} catch (DataAccessException e) {
			response.put("mensaje", "Error al actualizar el docente en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		response.put("mensaje", "El docente ha sido actualizado con éxito!");
		response.put("docente", docenteUpdated);

		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@Secured("ROLE_ADMIN")
	@DeleteMapping("/docentes/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		
		Map<String, Object> response = new HashMap<>();
		
		try {
			Docente docente = docenteService.findById(id);
			String nombreFotoAnterior = docente.getFoto();
			
			uploadService.eliminar(nombreFotoAnterior);
			
		    docenteService.delete(id);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al eliminar el docente de la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El docente eliminado con éxito!");
		
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}
	
	@Secured({"ROLE_ADMIN", "ROLE_USER"})
	@PostMapping("/docentes/upload")
	public ResponseEntity<?> upload(@RequestParam("archivo") MultipartFile archivo, @RequestParam("id") Long id){
		Map<String, Object> response = new HashMap<>();
		
		Docente docente = docenteService.findById(id);
		
		if(!archivo.isEmpty()) {

			String nombreArchivo = null;
			try {
				nombreArchivo = uploadService.copiar(archivo);
			} catch (IOException e) {
				response.put("mensaje", "Error al subir la imagen del docente");
				response.put("error", e.getMessage().concat(": ").concat(e.getCause().getMessage()));
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			
			String nombreFotoAnterior = docente.getFoto();
			
			uploadService.eliminar(nombreFotoAnterior);
						
			docente.setFoto(nombreArchivo);
			
			docenteService.save(docente);
			
			response.put("docente", docente);
			response.put("mensaje", "Has subido correctamente la imagen: " + nombreArchivo);
			
		}
		
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@GetMapping("/uploads/img/{nombreFoto:.+}")
	public ResponseEntity<Resource> verFoto(@PathVariable String nombreFoto){

		Resource recurso = null;
		
		try {
			recurso = uploadService.cargar(nombreFoto);
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		
		HttpHeaders cabecera = new HttpHeaders();
		cabecera.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + recurso.getFilename() + "\"");
		
		return new ResponseEntity<Resource>(recurso, cabecera, HttpStatus.OK);
	}

}
