package edual.authjwt.service;

import java.util.List;
import java.util.Optional;

import edual.authjwt.entity.Usuario;

public interface IUsuarioService {
  Usuario guardar(Usuario entidad);

  Optional<Usuario> buscarPorId(Integer id);

  Boolean eliminarPorId(Integer id);

  List<Usuario> listar();

}
