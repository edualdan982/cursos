package com.multdb;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource(value = "classpath:dev.properties")
@Profile("dev")
public class PerfilProperties {

}
