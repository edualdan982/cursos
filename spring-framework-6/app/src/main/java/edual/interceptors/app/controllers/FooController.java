package edual.interceptors.app.controllers;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edual.interceptors.app.dto.UserRequest;
import jakarta.validation.Valid;

/**
 * FooController
 */
@RestController
@RequestMapping("/app")
public class FooController {

  @GetMapping("/foo")
  public ResponseEntity<Map<String, Object>> foo(@RequestBody @Valid UserRequest request, BindingResult result) {
    Map<String, Object> response = new HashMap<>();

    if (result.hasErrors()) {
      List<String> errors = result.getFieldErrors().stream()
          .map(err -> String.format("%s: %s", err.getField(), err.getDefaultMessage())).toList();
      response.put("errors", errors);
      response.put("message", "La solicitud contiene errores de validacion");

      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    

    return ResponseEntity.ok(Collections.singletonMap("message", "handler foo del controlador"));
  }

  @GetMapping("/bar")
  public ResponseEntity<Map<String, Object>> bar() {
    return ResponseEntity.ok(Collections.singletonMap("message", "handler bar del controlador"));
  }

  @GetMapping("/baz")
  public ResponseEntity<Map<String, Object>> baz() {
    return ResponseEntity.ok(Collections.singletonMap("message", "handler baz del controlador"));
  }

}