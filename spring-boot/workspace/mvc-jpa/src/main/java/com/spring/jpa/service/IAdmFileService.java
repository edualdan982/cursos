package com.spring.jpa.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;

public interface IAdmFileService {
	/**
	 * @return Si se está ejecutando en eclipse, está al mismo nivel que el directorio de destino. Si se implementa en el servidor, está al mismo nivel que el paquete JAR por defecto
	 * @throws FileNotFoundException
	 * @throws IOException 
	 */
	public File rutaRecursoEstatico(String ruta) throws IOException;
	
	public String rutaProyecto() throws FileNotFoundException;
	
	public String guardarArchivo(String path) throws IOException;
	
}
