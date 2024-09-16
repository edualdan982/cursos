# Description: Dockerfile para la construcción de la imagen de Docker para el backend de la aplicación.
# ARG: MSVC_NAME nombre de la app spring-boot;
# MSVC_VERSION es necesario mandar un version;
# PORT_APP puerto de la app

#Se declara un varibale global para reutulizarlo en varios stages.
ARG MSVC_NAME=backend
ARG MSVC_VERSION=0.0.1-SNAPSHOT
#Elegimos una imagen como base para levantar el conenedor
FROM openjdk:17-jdk-alpine AS builder

#Debemos declarar solo el nombre de la variable para darle uso en este stage
ARG MSVC_NAME

#Configuramos el la direccion de trabajo, este el contexto de la ruta
WORKDIR /app/$MSVC_NAME

COPY ./$MSVC_NAME/.mvn ./.mvn
COPY ./$MSVC_NAME/mvnw .
COPY ./$MSVC_NAME/pom.xml .

COPY ./$MSVC_NAME/src ./src
#ESTE COMANDO SOLO HA SIDO NECESARIO PARA CONVERTIR EL FORMATO DEL FICHERO MVNW DE WINDOWS A LINUX, SINO FALLABA
RUN sed -i -e 's/\r$//' ./mvnw \
	&& ./mvnw clean package -Dmaven.test.skip -Dmaven.main.skip -Dspring-boot.repackage.skip && rm -r ./target/ \
  && ./mvnw clean package -DskipTests

#------------------------------------------------------------------------------------------------------------------
#-----------------SEGUNDO STAGE------------------
FROM openjdk:17-jdk-alpine

#Debemos declarar solo el nombre de la variable para darle uso en este stage
ARG MSVC_NAME
ARG MSVC_VERSION

WORKDIR /app
RUN mkdir ./logs

ARG TARGET_FOLDER=/app/$MSVC_NAME/target

COPY --from=builder $TARGET_FOLDER/$MSVC_NAME$-$MSVC_VERSION .

ENV NAME=$MSVC_NAME
ENV VERSION=$MSVC_VERSION

ARG PORT_APP=9000
ENV PORT $PORT_APP
EXPOSE $PORT


# ENTRYPOINT [ "java", "-jar", "msvc-auth-0.0.1-SNAPSHOT.jar"]
CMD [ "java", "-jar", "$NAME-$VERSION.jar"]