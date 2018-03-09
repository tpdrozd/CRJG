package tpd.crjg;

import org.neo4j.ogm.session.SessionFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.neo4j.repository.config.EnableNeo4jRepositories;
import org.springframework.data.neo4j.transaction.Neo4jTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@EnableNeo4jRepositories (basePackages = "tpd.crjg.repo")
public class Config {
	
	@Bean
	public org.neo4j.ogm.config.Configuration configuration () {
//		ConfigurationSource source = new ClasspathConfigurationSource("");
//		org.neo4j.ogm.config.Configuration config = new org.neo4j.ogm.config.Configuration.Builder(source).build();
		org.neo4j.ogm.config.Configuration config = new org.neo4j.ogm.config.Configuration.Builder()
			.uri("bolt://localhost")
			.credentials("crj", "crj")
			.build();
		return config;
	}
	
	@Bean
	public SessionFactory sessionFactory () {
		SessionFactory factory = new SessionFactory(configuration(), "tpd.crjg.domain");
		return factory;
	}
	
	@Bean
	public Neo4jTransactionManager transactionManager () {
		return new Neo4jTransactionManager(sessionFactory());
	}
	
}
