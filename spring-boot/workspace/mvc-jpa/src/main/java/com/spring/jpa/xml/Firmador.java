package com.spring.jpa.xml;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.security.GeneralSecurityException;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.Security;
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import org.apache.commons.codec.binary.Base64;
import org.apache.xml.security.Init;
import org.apache.xml.security.algorithms.MessageDigestAlgorithm;
import org.apache.xml.security.exceptions.XMLSecurityException;
import org.apache.xml.security.signature.XMLSignature;
import org.apache.xml.security.transforms.Transforms;
import org.apache.xml.security.utils.Constants;
import org.apache.xml.security.utils.ElementProxy;
import org.apache.xml.security.utils.XMLUtils;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.xml.sax.SAXException;
// http://stackoverflow.com/questions/7224626/how-to-sign-string-with-private-key

@Component
public class Firmador {
	private static Firmador instancia;
	static {
		Init.init();
		Security.addProvider(new BouncyCastleProvider());
	}

	/**
	 * Obtener un firmador por defecto.
	 * 
	 * @return un Firmador.
	 * 
	 */
	public static Firmador getInstance() {
		if (instancia == null) {
			instancia = new Firmador();
		}
		return instancia;
	}

	private Firmador() {
	}

	// Todo: Colocar en un solo directorio la llave privada con la publica
	/**
	 * Esta funcion añade una firma a un documento XML.
	 *
	 * @param datos Documento a firmar <i>XML</i>.
	 * @param priv  Clave privada.
	 * @param cert  Certificado del firmante.
	 * @return Retorna el documento con una firma.
	 * @throws ParserConfigurationException
	 * @throws IOException
	 * @throws SAXException
	 * @throws XMLSecurityException
	 */

	public static byte[] firmarDsig(byte[] datos, PrivateKey priv, X509Certificate... cert)
			throws ParserConfigurationException, IOException, SAXException, XMLSecurityException {

		ElementProxy.setDefaultPrefix(Constants.SignatureSpecNS, "");
		Document documento = leerXML(datos);
		Element root = (Element) documento.getFirstChild();
		documento.setXmlStandalone(false);
		XMLSignature signature = new XMLSignature(documento, null, XMLSignature.ALGO_ID_SIGNATURE_RSA_SHA256);
		root.appendChild(signature.getElement());
		Transforms transforms = new Transforms(documento);
		transforms.addTransform(Transforms.TRANSFORM_ENVELOPED_SIGNATURE);
		transforms.addTransform(Transforms.TRANSFORM_C14N_WITH_COMMENTS);
		signature.addDocument("", transforms, MessageDigestAlgorithm.ALGO_ID_DIGEST_SHA256);

		if (cert != null) {
			signature.addKeyInfo(cert[0]);
		}
		signature.sign(priv);
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		XMLUtils.outputDOMc14nWithComments(documento, baos);
		return baos.toString().getBytes();
	}

	/**
	 * 
	 * @param filename --> Ruta o PATH para obetener el recurso no es necesario
	 *                 enviar el una Dirección Raíz ya se usar el ClassPathResource.
	 * @return Retorna un cadena del contenido del archivo de ruta asiganda.
	 * @throws IOException
	 */
	private static String getKey(String filename) throws IOException {
		// Read key from file
		String strKeyPEM = null;
		File recurso = new ClassPathResource(filename).getFile();
		strKeyPEM = new String(Files.readAllBytes(recurso.toPath()));
		return strKeyPEM;
	}

	/**
	 * 
	 * @param filename --> Ingrese la ruta de la llave Privada que este relacionada
	 *                 con su Certificado.
	 * @return Retorna un Obejeto RSAPrivateKey para poder firmar el XML con el
	 *         metodo firmarDsig()
	 * @throws IOException
	 * @throws GeneralSecurityException
	 */
	public static RSAPrivateKey getPrivateKey(String filename) throws IOException, GeneralSecurityException {
		String privateKeyPEM = getKey(filename);
		return getPrivateKeyFromString(privateKeyPEM);
	}

	/**
	 * 
	 * @param filename  --> Ingrese la ruta del "Cetificado" ya sea .CSR | .CERT
	 * @param instancia --> Asigne el tipo de algoritmo: Ej. "X.509" | "RSA"
	 * @return X509Certificate --> Recupera la firma en la instacia mencionada, para
	 *         firmar el XML.
	 * @throws IOException
	 * @throws CertificateException
	 */
	public static X509Certificate getX509Certificate(String filename, String instancia)
			throws IOException, CertificateException {
		CertificateFactory fact = CertificateFactory.getInstance(instancia);
		File resource = new ClassPathResource(filename).getFile();
		FileInputStream is = new FileInputStream(resource);
		X509Certificate cer = (X509Certificate) fact.generateCertificate(is);
		/*
		 * Si tenemos un clave publica, agregar el siguinete Codigo PublicKey key =
		 * cer.getPublicKey();
		 */
		return cer;
	}

	public static Document leerXML(byte datos[]) throws ParserConfigurationException, IOException, SAXException {
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		DocumentBuilder builder;
		factory.setNamespaceAware(true);
		builder = factory.newDocumentBuilder();
		return builder.parse(new ByteArrayInputStream(datos));
	}

	public static RSAPrivateKey getPrivateKeyFromString(String key) throws IOException, GeneralSecurityException {
		String privateKeyPEM = key;
		privateKeyPEM = privateKeyPEM.replace("-----BEGIN RSA PRIVATE KEY-----\n", "");
		privateKeyPEM = privateKeyPEM.replace("-----END RSA PRIVATE KEY-----", "");
		byte[] encoded = Base64.decodeBase64(privateKeyPEM);
		KeyFactory kf = KeyFactory.getInstance("RSA");
		PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(encoded);
		RSAPrivateKey privKey = (RSAPrivateKey) kf.generatePrivate(keySpec);
		return privKey;
	}

	public static RSAPublicKey getPublicKey(String filename) throws IOException, GeneralSecurityException {
		String publicKeyPEM = getKey(filename);
		return getPublicKeyFromString(publicKeyPEM);
	}

	public static RSAPublicKey getPublicKeyFromString(String key) throws IOException, GeneralSecurityException {
		String publicKeyPEM = key;
		publicKeyPEM = publicKeyPEM.replace("-----BEGIN PUBLIC KEY-----\n", "");
		publicKeyPEM = publicKeyPEM.replace("-----END PUBLIC KEY-----", "");
		byte[] encoded = Base64.decodeBase64(publicKeyPEM);
		KeyFactory kf = KeyFactory.getInstance("RSA");
		RSAPublicKey pubKey = (RSAPublicKey) kf.generatePublic(new X509EncodedKeySpec(encoded));
		return pubKey;
	}
}
