package edual.authjwt.idao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edual.authjwt.entity.Usuario;

public interface IUsuarioDao extends JpaRepository<Usuario, Integer> {

  @Query("UPDATE Usuario SET eliminado = true WHERE usuarioId = :id")
  void eliminarPorId(Integer id);

  @Query("SELECT u FROM Usuario u WHERE u.eliminado = false")
  List<Usuario> listar();
}
