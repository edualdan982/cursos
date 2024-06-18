package com.spring.jpa;

import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.ws.config.annotation.EnableWs;
import org.springframework.ws.config.annotation.WsConfigurerAdapter;
import org.springframework.ws.transport.http.MessageDispatcherServlet;
import org.springframework.ws.wsdl.wsdl11.DefaultWsdl11Definition;
import org.springframework.xml.xsd.SimpleXsdSchema;
import org.springframework.xml.xsd.XsdSchema;

import com.spring.jpa.producingwebservice.CountryEndpoint;
import com.spring.jpa.producingwebservice.MovieEndPoint;

@EnableWs
@Configuration
public class WebServiveConfig extends WsConfigurerAdapter {

	@Bean
	public ServletRegistrationBean<MessageDispatcherServlet> messageDispatcherServlet(
			ApplicationContext applicationContext) {
		MessageDispatcherServlet servlet = new MessageDispatcherServlet();
		servlet.setApplicationContext(applicationContext);
		servlet.setTransformWsdlLocations(true);
		return new ServletRegistrationBean<>(servlet, "/ws/*");
	}

	@Bean
	public XsdSchema countriesSchema() {
		return new SimpleXsdSchema(new ClassPathResource("/xsd/countries.xsd"));
	}

	// URI/ws/countries.wsdl
	@Bean(name = "countries")
	public DefaultWsdl11Definition defaultWsdl11DefinitionCountries(XsdSchema countriesSchema) {
		DefaultWsdl11Definition wsdl11Definition = new DefaultWsdl11Definition();
		wsdl11Definition.setPortTypeName("CountriesPort");
		wsdl11Definition.setLocationUri("/ws");
		wsdl11Definition.setTargetNamespace(CountryEndpoint.NAMESPACE_URI);
		wsdl11Definition.setSchema(countriesSchema);
		return wsdl11Definition;
	}

	@Bean
	public XsdSchema moviesSchema() {
		return new SimpleXsdSchema(new ClassPathResource("/xsd/movies.xsd"));
	}

	// URI/ws/movies.wsdl
	@Bean(name = "movies")
	public DefaultWsdl11Definition defaultWsdl11DefinitionMovies(XsdSchema moviesSchema) {
		DefaultWsdl11Definition wsdl11Definition = new DefaultWsdl11Definition();
		wsdl11Definition.setPortTypeName("MoviesPort");
		wsdl11Definition.setLocationUri("/ws");
		wsdl11Definition.setTargetNamespace(MovieEndPoint.NAMESPACE_URI);
		wsdl11Definition.setSchema(moviesSchema);
		return wsdl11Definition;
	}

}
