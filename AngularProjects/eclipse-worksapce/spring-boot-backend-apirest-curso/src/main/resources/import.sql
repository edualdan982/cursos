INSERT INTO cursos (nombre) VALUES ('Java');
INSERT INTO cursos (nombre) VALUES ('C++');
INSERT INTO cursos (nombre) VALUES ('Bootstrap');
INSERT INTO cursos (nombre) VALUES ('JavaScript');
INSERT INTO cursos (nombre) VALUES ('Angular');
INSERT INTO cursos (nombre) VALUES ('TypeScript');
INSERT INTO cursos (nombre) VALUES ('HTML');
INSERT INTO cursos (nombre) VALUES ('CSS');
INSERT INTO cursos (nombre) VALUES ('SpirgBoot');
INSERT INTO cursos (nombre) VALUES ('Assembler');

INSERT INTO docentes (nombres, paterno, materno, email) VALUES('Andrés Dual', 'Guzmán','Porta' ,'an.guzman@cursovirtual.com');
INSERT INTO docentes (nombres, paterno, materno, email) VALUES('Jose Luis', 'Doe','Torvalds' ,'jo.doe@cursovirtual.com');
INSERT INTO docentes (nombres, paterno, materno, email) VALUES('Pedro', 'Sarmiento','Gafias' ,'pe.sarmiento@cursovirtual.com');
INSERT INTO docentes (nombres, paterno, materno, email) VALUES('Gabriel', 'Olaguiver','Comon' ,'ga.olaguiver@cursovirtual.com');
INSERT INTO docentes (nombres, paterno, materno, email) VALUES('Miguel', 'Porta','Zeballos' ,'mi.porta@cursovirtual.com');
INSERT INTO docentes (nombres, paterno, materno, email) VALUES('Calef', 'Villa','Gitler' ,'ca.villa@cursovirtual.com');


INSERT INTO estudiantes (nombres, paterno, materno, email) VALUES('Dan', 'Garfias','Sarmiento' ,'da.garfias@cursovirtual.com');

INSERT INTO `usuarios` (username, password, enabled, nombre, apellido, email) VALUES ('edual','$2a$10$C3Uln5uqnzx/GswADURJGOIdBqYrly9731fnwKDaUdBkt/M3qvtLq',1, 'Andres', 'Guzman','profesor@bolsadeideas.com');
INSERT INTO `usuarios` (username, password, enabled, nombre, apellido, email) VALUES ('admin','$2a$10$RmdEsvEfhI7Rcm9f/uZXPebZVCcPC7ZXZwV51efAvMAp1rIaRAfPK',1, 'John', 'Doe','jhon.doe@bolsadeideas.com');

INSERT INTO `roles` (nombre) VALUES ('ROLE_USER');
INSERT INTO `roles` (nombre) VALUES ('ROLE_ADMIN');

INSERT INTO `usuarios_roles` (usuario_id, role_id) VALUES (1, 1);
INSERT INTO `usuarios_roles` (usuario_id, role_id) VALUES (2, 2);
INSERT INTO `usuarios_roles` (usuario_id, role_id) VALUES (2, 1);

