    docker run -it -p 9500:9500 -p 9502:9502 -e ADMIN_USERNAME=weblogic -e ADMIN_PASSWORD=wlusu10 -e DB_HOST=database -e DB_PORT=1521 -e DB_SERVICE=ORCLPDB1 -e DB_USERNAME=sys -e DB_PASSWORD=<db_password> -e SCHEMA_PREFIX=DEV -e SCHEMA_PASSWORD=<schema_password> oracle/biplatform:12.2.1.3


    https://faun.pub/run-sql-startup-script-on-oracle-database-container-initialization-e94ea983dccd