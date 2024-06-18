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
@EnableJpaRepositories(entityManagerFactoryRef = "mysqlEntityManagerFactory", transactionManagerRef = "mysqlTransacctionManagerRef"
		, basePackages = { "com.multdb.repo.mysql"})

public class BDMysqlConfig {

	@Autowired
	private Environment env;
	
	@Bean(name = "mysqlDataSource")
	public DataSource userDataSource() {
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		dataSource.setUrl(env.getProperty("mysql.datasource.url"));
		dataSource.setUsername(env.getProperty("mysql.datasource.username"));
		dataSource.setPassword(env.getProperty("mysql.datasource.password"));
		dataSource.setDriverClassName(env.getProperty("mysql.datasource.driver-class-name"));
		
		return dataSource;
	}
	
	@Bean(name = "mysqlEntityManagerFactory")
	public LocalContainerEntityManagerFactoryBean entityManagerFactoryPostgres() {
		LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
		em.setDataSource(userDataSource());
		em.setPackagesToScan("com.multdb.entitys.mysql");
		
		HibernateJpaVendorAdapter vendorAdpater = new HibernateJpaVendorAdapter();
		em.setJpaVendorAdapter(vendorAdpater);
		
		Map<String, Object> jpaProperties = new HashMap<>();
		
		jpaProperties.put("hibernate.hbm2ddl.auto", env.getProperty("mysql.jpa.hibernate.ddl-auto"));
		jpaProperties.put("hibernate.show-sql", env.getProperty("mysql.jpa.show-sql"));
		jpaProperties.put("hibernate.dialect", env.getProperty("mysql.jpa.database-platform"));
		
		em.setJpaPropertyMap(jpaProperties);
		
		return em;
	}
	
	@Bean(name = "mysqlTransacctionManagerRef")
	public PlatformTransactionManager mysqlTransacctionManagerRef() {
		JpaTransactionManager transactionManager = new JpaTransactionManager();
		transactionManager.setEntityManagerFactory(entityManagerFactoryPostgres().getObject());
		
		return transactionManager;
	}
}
