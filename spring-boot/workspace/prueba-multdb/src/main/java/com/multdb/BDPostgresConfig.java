package com.multdb;

import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(entityManagerFactoryRef = "postgresEntityManagerFactory", transactionManagerRef = "postgresTransacctionManagerRef"
		, basePackages = { "com.multdb.repo.postgres"})

public class BDPostgresConfig {

	@Autowired
	private Environment env;
	
	@Bean(name = "postgresDataSource")
	public DataSource userDataSource() {
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		dataSource.setUrl(env.getProperty("postgres.datasource.url"));
		dataSource.setUsername(env.getProperty("postgres.datasource.username"));
		dataSource.setPassword(env.getProperty("postgres.datasource.password"));
		dataSource.setDriverClassName(env.getProperty("postgres.datasource.driver-class-name"));
		
		return dataSource;
	}
	
	@Bean(name = "postgresEntityManagerFactory")
	public LocalContainerEntityManagerFactoryBean entityManagerFactoryMysql() {
		LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
		em.setDataSource(userDataSource());
		em.setPackagesToScan("com.multdb.entitys.postgres");
		
		HibernateJpaVendorAdapter vendorAdpater = new HibernateJpaVendorAdapter();
		em.setJpaVendorAdapter(vendorAdpater);
		
		Map<String, Object> jpaProperties = new HashMap<>();
		
		jpaProperties.put("hibernate.hbm2ddl.auto", env.getProperty("postgres.jpa.hibernate.ddl-auto"));
		jpaProperties.put("hibernate.show-sql", env.getProperty("postgres.jpa.show-sql"));
		jpaProperties.put("hibernate.dialect", env.getProperty("postgres.jpa.database-platform"));
		
		em.setJpaPropertyMap(jpaProperties);
		
		return em;
	}
	
	@Bean(name = "postgresTransacctionManagerRef")
	public PlatformTransactionManager postgresTransacctionManagerRef() {
		JpaTransactionManager transactionManager = new JpaTransactionManager();
		transactionManager.setEntityManagerFactory(entityManagerFactoryMysql().getObject());
		
		return transactionManager;
	}
}
