package tpd.crjg.repo;

import java.util.List;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.query.Param;

import tpd.crjg.domain.Depot;

public interface DepotRepo extends Neo4jRepository<Depot, Long> {

	@Query("MATCH (d:Depot)-[WITHIN]->(t:Town) WHERE id(t) = {townId} RETURN d ORDER BY d.name")
	public List<Depot> getDepots ( @Param ("townId") Long townId );
	
}
