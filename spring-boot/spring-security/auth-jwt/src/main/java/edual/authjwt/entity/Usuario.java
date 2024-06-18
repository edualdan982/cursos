package edual.authjwt.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "auth_usuario", uniqueConstraints = {
    @UniqueConstraint(name = "auth_nombre_usuario_uk", columnNames = "usuario") })
public class Usuario {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer usuarioId;

  @NotEmpty
  @Size(min = 4, max = 50)
  @Column(length = 50)
  private String usuario;

  @NotEmpty
  @Column(length = 256)
  private String clave;

  @Column(columnDefinition = "bit(1) default 1")
  private Boolean activo;

  @Column(columnDefinition = "bit(1) default 0")
  private Boolean eliminado;

  @Temporal(TemporalType.TIMESTAMP)
  private Date fechaModificacion;

  @Temporal(TemporalType.TIMESTAMP)
  @Column(columnDefinition = "DATETIME default CURRENT_TIMESTAMP")
  private Date fechaRegistro;

  public Usuario() {
    this.activo = true;
  }

  @PrePersist
  public void prePersist() {
    this.activo = true;

  }

  // ? Getters y Setters

  public Integer getUsuarioId() {
    return usuarioId;
  }

  public void setUsuarioId(Integer usuarioId) {
    this.usuarioId = usuarioId;
  }

  public String getUsuario() {
    return usuario;
  }

  public void setUsuario(String usuario) {
    this.usuario = usuario;
  }

  public String getClave() {
    return clave;
  }

  public void setClave(String clave) {
    this.clave = clave;
  }

  public Boolean getActivo() {
    return activo;
  }

  public void setActivo(Boolean activo) {
    this.activo = activo;
  }

  public Boolean getEliminado() {
    return eliminado;
  }

  public void setEliminado(Boolean eliminado) {
    this.eliminado = eliminado;
  }

  public Date getFechaModificacion() {
    return fechaModificacion;
  }

  public void setFechaModificacion(Date fechaModificacion) {
    this.fechaModificacion = fechaModificacion;
  }

  // ? FIN

}
