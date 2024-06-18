package com.spring.jpa.xml;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.StringWriter;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;

/**
 * 
 * @author Edual Dan Sarmiento Garfias
 *
 * @param <T>
 */

public class ConvertirdorXml<T> {
	private JAXBContext jaxbContext;
	private T wapper;
	public StringWriter result;
	private String xsd;
	private String codificacion;
	private File tempfile;

	/**
	 * 
	 * @param objetoWraper --> Este debe ser un objecto que tenga un
	 *                     contenedor @XmlRootElement y @XmlElement como atrinbutos
	 *                     publicos.
	 * @throws JAXBException
	 */
	public ConvertirdorXml(T objetoWraper, String xsd, String codificacion) throws JAXBException {
		this.wapper = objetoWraper;
		// La clase Marshaller proporciona a la aplicación cliente la capacidad
		// de convertir un árbol de contenido Java en datos XML.
		jaxbContext = JAXBContext.newInstance(objetoWraper.getClass());
		result = new StringWriter();
		this.xsd = xsd;
		this.codificacion = codificacion;
	}

	/**
	 * Para convertir el objeto Wrepper a XML, obtener el resutlado con
	 * instacia.getResult.toString();
	 */
	public void convertir() {
		try {
			Marshaller jaxbMarshaller = jaxbContext.createMarshaller();
			// Se definen algunas propiedades standar - Datos formateados con salto de linea
			// y sangria
			jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
			// Especifica el valor del atributo xsi: schemaLocation para colocar en la
			/*
			 * ESTE ATRIBUTO NO ERA NECESARIO PERO LO DEJO SI HA FUTURUO LO ES
			 * jaxbMarshaller.setProperty(Marshaller.JAXB_SCHEMA_LOCATION,
			 * XMLConstants.W3C_XML_SCHEMA_INSTANCE_NS_URI);
			 */
			// Codificacion de salida
			jaxbMarshaller.setProperty(Marshaller.JAXB_ENCODING, this.codificacion);
			// El nombre del esquemaXSD para el atributo xsi: noNamespaceSchemaLocation
			jaxbMarshaller.setProperty(Marshaller.JAXB_NO_NAMESPACE_SCHEMA_LOCATION, this.xsd);
			// Se genera el XML y se guarda en StringWriter
			// strBuild.append(UUID.randomUUID().toString());
			jaxbMarshaller.marshal(this.wapper, result);
		} catch (JAXBException e) {
			e.printStackTrace();
		}
	}

	public String obtenerTempFilePath() throws IOException {
		this.tempfile = File.createTempFile("archivo", ".xml");
		String tmpdir = System.getProperty("java.io.tmpdir");

		System.out.println(tmpdir);
		BufferedWriter out = new BufferedWriter(new FileWriter(tempfile));
		out.write(result.toString());
		out.close();

		return tempfile.getAbsolutePath();
	}

	public void limpiar() {
		tempfile.deleteOnExit();
	}

	public T getWapper() {
		return wapper;
	}

	public String getXsd() {
		return xsd;
	}

	public String getCodificacion() {
		return codificacion;
	}

}
