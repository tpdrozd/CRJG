package tpd.crjg.repo;

import java.util.List;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

import tpd.crjg.domain.Locality;

@Repository
public interface LocalityRepo extends Neo4jRepository<Locality, Long> {
	
//	@Query ("MATCH (l:Locality) WHERE id(l) = {id} RETURN l")
//	public Locality byId ( @Param ("id") Long id );
	
	@Query ("MATCH (l:Locality) RETURN DISTINCT l.wojewodztwo AS wojew ORDER BY wojew")
	public List<String> extractWojewodztwa ();
	
}
