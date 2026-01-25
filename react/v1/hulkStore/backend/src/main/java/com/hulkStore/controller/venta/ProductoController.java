package com.hulkStore.controller.venta;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hulkStore.entity.Producto;
import com.hulkStore.impl.IProductoService;

@RestController
@RequestMapping("/producto")
@Secured("ROLE_USER")
public class ProductoController {

	@Autowired
	private IProductoService productoService;

	@GetMapping
	public ResponseEntity<?> listarProductos() {
		Map<String, Object> response = new HashMap<>();
		response.put("estado", false);
		response.put("respuesta", null);

		List<Producto> lista = productoService.listar();
		if (lista == null)
			lista = new ArrayList<>();

		if (lista.size() == 0) {
			response.put("respuesta", new ArrayList<>());
			response.put("mensaje", "No se han encontrado productos");
		} else {
			response.put("estado", true);
			response.put("respuesta", lista);
			response.put("mensaje", "Listado de productos");
		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/buscar")
	public ResponseEntity<?> buscarPorDescripcion(@RequestParam(required = false) String descripcion) {
		Map<String, Object> response = new HashMap<>();
		response.put("estado", false);
		response.put("respuesta", null);

		if (descripcion == null) {
			response.put("mensaje", "El parametro descripcion es requerido");

			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}
		List<Producto> lista = productoService.buscarPorDescripcion(descripcion);

		if (lista == null)
			lista = new ArrayList<>();
		if (lista.size() == 0) {
			response.put("respuesta", new ArrayList<>());
			response.put("mensaje", "No se han encontrado productos");
		} else {
			response.put("estado", true);
			response.put("respuesta", lista);
			response.put("mensaje", "Listado de productos");
		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<?> guardarProducto(@Valid @RequestBody Producto producto, BindingResult result) {
		Map<String, Object> response = new HashMap<>();
		response.put("estado", false);
		response.put("respuesta", null);
		response.put("errors", null);

		if (result.hasErrors()) {
			List<String> errors = result.getFieldErrors().stream()
					.map(err -> err.getField().concat(": ").concat(err.getDefaultMessage()))
					.collect(Collectors.toList());

			response.put("mensaje", "Errores en el request, revise los datos enviados");
			response.put("errors", errors);
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}
		producto.setFechaRegistro(new Date());
		Producto newProducto = productoService.guardar(producto);

		response.put("estado", true);
		response.put("respuesta", newProducto);
		response.put("mensaje", "Se ha guardado el producto");

		return new ResponseEntity<>(response, HttpStatus.OK);
	}
}
