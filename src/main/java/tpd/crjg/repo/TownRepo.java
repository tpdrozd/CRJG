package tpd.crjg.repo;

import java.util.List;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tpd.crjg.domain.Town;

@Repository
public interface TownRepo extends Neo4jRepository<Town, Long> {
	
	//	@Query ("MATCH (l:Locality) WHERE id(l) = {id} RETURN l")
	//	public Locality byId ( @Param ("id") Long id );
	
	@Query ("MATCH (t:Town) RETURN DISTINCT t.wojewodztwo AS wojew ORDER BY wojew")
	public List<String> extractWojewodztwa ();
	
	@Query ("MATCH (t:Town) WHERE distance(t.coord, point({latitude: {lat}, longitude: {lng}})) <= {radius} RETURN t")
	public List<Town> findSpatial ( @Param ("lat") double lat, @Param ("lng") double lng, @Param ("radius") int radius );
	
	@Query ("MATCH (a), (b) WHERE id(a) = {idA} AND id(b) = {idB} RETURN round(distance(a.coord, b.coord))")
	public int distance ( @Param ("idA") long placeAId, @Param ("idB") long placeBId );
	
}
