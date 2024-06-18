# Para arrancar desde un contenedor
- $> docker run -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_DATABASE=msvc_usuarios -d --name mysql-db-8.0 --network spring mysql:8.0