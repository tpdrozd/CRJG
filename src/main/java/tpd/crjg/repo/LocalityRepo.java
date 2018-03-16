package tpd.crjg.repo;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tpd.crjg.domain.Locality;
import tpd.crjg.domain.LocalityPlain;
import tpd.crjg.domain.LocalitySimple;

@Repository
public interface LocalityRepo extends Neo4jRepository<Locality, Long> {
	
	@Query (countQuery	= "MATCH (l:Locality) WHERE toLower(l.name) STARTS WITH toLower({name}) RETURN count(l)",
			value		= "MATCH (l:Locality) WHERE toLower(l.name) STARTS WITH toLower({name}) RETURN " +
							"id(l) AS id, l.idTeryt AS idTeryt, l.name AS name, l.type AS type, l.parentName AS parentName, " +
							"l.gmina AS gmina, l.powiat AS powiat, l.wojewodztwo AS wojewodztwo, l.historicalName AS historicalName, " +
							"l.otherName AS collateralName, l.additName AS foreignName, l.additNameLatin AS foreignLatin, l.endonim AS endonim")
	public Page<LocalityPlain> findPlainByName ( @Param ("name") String name, Pageable pageable );
	
	@Query (countQuery	= "MATCH (l:Locality) WHERE toLower(l.name) STARTS WITH toLower({name}) RETURN count(l)",
			value		= "MATCH (l:Locality) WHERE toLower(l.name) STARTS WITH toLower({name}) " +
						  "WITH l AS l, [l.historicalName, l.otherName, l.additName, '('+l.additNameLatin+')', l.endonim] AS names " +
						  "WITH l AS l, filter(n IN names WHERE n IS NOT NULL) AS names " +
						  "WITH l AS l, reduce(nms = head(names), n IN tail(names) | nms + ' / ' + n) AS names " +
						  "WITH l AS l, replace(names, '/ (', '(') AS names " +
						  "RETURN id(l) AS id, l.idTeryt AS idTeryt, l.name AS name, l.type AS type, l.parentName AS parentName, " +
								 "names AS otherNames, l.gmina AS gmina, l.powiat AS powiat, l.wojewodztwo AS wojewodztwo")
	public Page<LocalitySimple> findSimpleByName ( @Param ("name") String name, Pageable pageable );

	@Query ("MATCH (l:Locality) WHERE id(l) = {id} RETURN l")
	public Locality byId ( @Param ("id") Long id );
	
	@Query ("MATCH (l:Locality) RETURN DISTINCT l.wojewodztwo AS wojew ORDER BY wojew")
	public List<String> extractWojewodztwa ();
	
}
