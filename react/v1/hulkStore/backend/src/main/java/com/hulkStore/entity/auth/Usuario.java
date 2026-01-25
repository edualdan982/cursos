package com.hulkStore.entity.auth;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotEmpty;

@Entity
@Table(name = "ADM_USUARIOS", uniqueConstraints = {
		@UniqueConstraint(name = "ADM_UQ_USUARIO", columnNames = "usuario") })
public class Usuario implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_usuario")
	private Integer id;

	@NotEmpty
	@Column(name = "usuario", length = 20)
	private String username;
	@NotEmpty
	private String password;
	private Boolean estado;

	private String nombre;
	private String apellido;

	private String correo;

	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinTable(name = "adm_usuarios_roles", joinColumns = @JoinColumn(name = "usuario_id", foreignKey = @ForeignKey(name = "ADM_FK_ID_USUARIO")), inverseJoinColumns = @JoinColumn(name = "rol_id", foreignKey = @ForeignKey(name = "ADM_FK_ID_ROL")), uniqueConstraints = {
			@UniqueConstraint(name = "ADM_UQ_USUARIO_ROL", columnNames = { "usuario_id", "rol_id" }) })
	private List<Rol> roles;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Boolean getEstado() {
		return estado;
	}

	public void setEstado(Boolean estado) {
		this.estado = estado;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}

	public List<Rol> getRoles() {
		return roles;
	}

	public void setRoles(List<Rol> roles) {
		this.roles = roles;
	}

	private static final long serialVersionUID = 1L;
}
