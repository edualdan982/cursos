package edual.interceptors.app.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;
import java.util.Collections;

/**
 * FooController
 */
@RestController
@RequestMapping("/app")
public class FooController {

  @GetMapping("/foo")
  public ResponseEntity<Map<String, Object>> foo() {
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