package com.hulkStore.impl.auth;

import com.hulkStore.entity.auth.Usuario;

public interface IUsuarioService {

	public Usuario buscarPorUsername(String username);
}
