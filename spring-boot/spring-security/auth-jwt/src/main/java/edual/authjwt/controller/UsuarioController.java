package edual.authjwt.controller;

import java.util.Collections;
import java.util.Map;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edual.authjwt.entity.Usuario;
import edual.authjwt.service.IUsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {
  private static final Logger log = LoggerFactory.getLogger(UsuarioController.class);

  @Autowired
  private IUsuarioService usuarioService;

  @Autowired
  private BCryptPasswordEncoder passwordEncoder;

  @GetMapping("/encode")
  public ResponseEntity<Map<String, Object>> codificarClave(@RequestParam(required = false) String clave) {
    return ResponseEntity.ok(Collections.singletonMap("clave", passwordEncoder.encode(clave)));
  }
  
  @GetMapping("/listar")
  public ResponseEntity<List<Usuario>> listarUsuarios() {
      return ResponseEntity.ok(usuarioService.listar());
  }
  
}
