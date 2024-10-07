#!/bin/bash
ORACLE_BASE=/opt/oracle;
ORACLE_HOME=$ORACLE_BASE/product/21c/dbhome_1;
PARAMETROS="-F t"
FECHA_HORA=$(/bin/date +%Y-%m-%d_%H%M)
FECHA=$(/bin/date +%Y-%m-%d)


if [ "$#" = "0" ];
then
  echo -e "\nInserte como primer parametro el nombre de Usuario"
  exit 1
fi
USER=$1

if [ "$#" = "1" ];
then
  echo -e "\nInserte como segundo parametro el password del usuario"
  read -s -p "Password: " CLAVE
else
  CLAVE=$2
fi

if [ "$#" = "2" ];
then
  echo -e "\nInserte como tercer parametro parametro el service name o PDB de la base de datos"
  read -s -p "Service-Name: " PDB
else
  PDB=$3
fi

echo $(date)
echo -e "\nEjecutando el script para sacar la copia de seguridad: $USER/$PDB"


$ORACLE_HOME/bin/exp $USER/$CLAVE@localhost:1521/$PDB file=/home/oracle/backup/$USER$FECHA_HORA.dmp
echo -e "Comprimiento el archivo el dump"
gzip -q /home/oracle/backup/$USER$FECHA*.*

echo -e "Ha finalizado el script de copia de seguridad."