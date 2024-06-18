#/bin/bash
#Para generar el .CSR que es la peticion para la certificacion
#Este viene con la configuracion de "configOpenSSL_genCSR.txt" que con ello generamos el .CSR
openssl req -new -config configOpenSSL_genCSR.txt -keyout privatekey.pem -out nombreEmpresa.csr

#Para simular la certificacion debemos autofirmar como entidad certificadora
openssl x509 -req -days 30 -in certificado.csr -signkey privatekey.pem -extfile extensiones.txt -out sscert.cert
