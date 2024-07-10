package edual.interceptors.app.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
  

  @GetMapping("/listar")
  public ResponseEntity<List<String>> listar(@RequestParam String param) {
    return ResponseEntity.ok(new ArrayList<String>());
  }

}
