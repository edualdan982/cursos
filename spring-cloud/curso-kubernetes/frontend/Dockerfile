
# Stage 0
ARG MSVC_NAME=msvc-angular-app

FROM node:20.9.0 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
ARG CONFIGURATION=production
RUN npm run build -- --output-path=./dist/out --configuration "$CONFIGURATION"
# Stage 1
FROM nginx:1.27
# Copiamos los datos compilados del proyecto
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
# Copiamos la configuración de nginx
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
