package com.spring.jpa;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.spring.jpa.xml.ClienteList;
import com.spring.jpa.xml.FacturaList;

@Configuration
public class MvcConfig implements WebMvcConfigurer{

	@Bean
	public Jaxb2Marshaller jaxb2Marshaller() {
		Jaxb2Marshaller mashaller = new Jaxb2Marshaller();
		mashaller.setClassesToBeBound(new Class[] {
			ClienteList.class, FacturaList.class
		});
		return mashaller;
	}
}