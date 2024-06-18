package com.spring.jpa.serviceimpl;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.StringWriter;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import com.spring.jpa.service.IAdmFileService;

@Service
public class AdmFileService implements IAdmFileService {

	@Override
	public File rutaRecursoEstatico(String ruta) throws IOException {
		File path = new ClassPathResource(ruta).getFile();
		if (path == null || !path.exists()) {
			path = new File("");
		}
		return path;
	}

	@Override
	public String rutaProyecto() throws FileNotFoundException {
		File path = new File(ResourceUtils.getURL("classpath:").getPath());
		String pathStr = path.getAbsolutePath();
		return pathStr.replace("\\target\\classes", "");
	}

	@Override
	public String guardarArchivo(String path) throws IOException {
		File file = new File(path);
		String tmpdir = System.getProperty("java.io.tmpdir");

		System.out.println(tmpdir);
		BufferedWriter out = new BufferedWriter(new FileWriter(file));
		StringWriter result = new StringWriter();
		out.write(result.toString());
		out.close();
		return null;
	}

}
