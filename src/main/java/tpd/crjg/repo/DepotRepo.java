package tpd.crjg.repo;

import org.springframework.data.neo4j.repository.Neo4jRepository;

import tpd.crjg.domain.Depot;

public interface DepotRepo extends Neo4jRepository<Depot, Long> {
	
}
