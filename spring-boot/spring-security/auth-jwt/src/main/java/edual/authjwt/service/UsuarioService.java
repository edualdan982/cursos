package edual.authjwt.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edual.authjwt.entity.Usuario;
import edual.authjwt.idao.IUsuarioDao;

@Service
public class UsuarioService implements IUsuarioService {
  private static final Logger log = LoggerFactory.getLogger(UsuarioService.class);

  @Autowired
  private IUsuarioDao repository;

  @Transactional
  @Override
  public Usuario guardar(Usuario entidad) {
    log.debug("Procesando el metodo guardar de UsaurioService, entidad {}", Usuario.class.getSimpleName());
    return repository.save(entidad);
  }

  @Transactional(readOnly = true)
  @Override
  public Optional<Usuario> buscarPorId(Integer id) {
    log.debug("Procesando el metodo buscarPorId de UsaurioService, entidad {}", Usuario.class.getSimpleName());
    return repository.findById(id);
  }

  @Transactional
  @Override
  public Boolean eliminarPorId(Integer id) {
    log.debug("Procesando el metodo eliminarPorId de UsaurioService, entidad {}", Usuario.class.getSimpleName());
    try {
      repository.eliminarPorId(id);
      return true;
    } catch (Exception e) {
      log.error("No se puedo eliminar el Usuario con id: {}. Detalle {}", id,
          (e.getLocalizedMessage() == null ? "Sin detalle" : e.getLocalizedMessage()));
      return false;
    }
  }

  @Transactional(readOnly = true)
  @Override
  public List<Usuario> listar() {
    return repository.listar();
  }

}
