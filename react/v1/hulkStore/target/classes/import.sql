/* Creamos algunos usuarios con sus roles */
INSERT INTO `adm_usuarios` (usuario, password, estado, nombre, apellido, correo) VALUES ('user','$2a$10$NGy1xNGjVni.XDWXGW/Q3.ohIr6LdmLVGB3pMDTifWVNGuS1CJCIG',1, 'Edual', 'Sarmiento','user@dominio.com');
INSERT INTO `adm_usuarios` (usuario, password, estado, nombre, apellido, correo) VALUES ('admin','$2a$10$NGy1xNGjVni.XDWXGW/Q3.ohIr6LdmLVGB3pMDTifWVNGuS1CJCIG',1, 'Dan', 'Garfias','admin@dominio.com');

INSERT INTO `adm_roles` (nombre) VALUES ('ROLE_USER');
INSERT INTO `adm_roles` (nombre) VALUES ('ROLE_ADMIN');

INSERT INTO `adm_usuarios_roles` (usuario_id, rol_id) VALUES (1, 1);
INSERT INTO `adm_usuarios_roles` (usuario_id, rol_id) VALUES (2, 2);
INSERT INTO `adm_usuarios_roles` (usuario_id, rol_id) VALUES (2, 1);
