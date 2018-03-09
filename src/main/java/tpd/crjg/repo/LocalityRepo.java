package tpd.crjg.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tpd.crjg.domain.Locality;

@Repository
public interface LocalityRepo extends PagingAndSortingRepository<Locality, Long> {
	
	@Query (value		= "MATCH (l:Locality) WHERE toLower(l.name) STARTS WITH toLower({name}) RETURN l",
			countQuery	= "MATCH (l:Locality) WHERE toLower(l.name) STARTS WITH toLower({name}) RETURN count(l)")
	public Page<Locality> findByName ( @Param("name") String name, Pageable pageable );
	
}
