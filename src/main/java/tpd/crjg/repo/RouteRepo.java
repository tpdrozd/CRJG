package tpd.crjg.repo;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

import tpd.crjg.domain.Route;

@Repository
public interface RouteRepo extends Neo4jRepository<Route, Long> {
	
}
