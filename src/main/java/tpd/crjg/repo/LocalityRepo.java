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
import tpd.crjg.service.LocalitySearchCriteria.Kind;

@Repository
public interface LocalityRepo extends Neo4jRepository<Locality, Long> {
	
	@Query (countQuery	= "MATCH (l:Locality) WHERE l._name STARTS WITH toLower({name}) RETURN count(l)",
			value		= "MATCH (l:Locality) WHERE l._name STARTS WITH toLower({name}) RETURN " +
							"id(l) AS id, l.idTeryt AS idTeryt, l.name AS name, l.type AS type, l.parentName AS parentName, " +
							"l.gmina AS gmina, l.powiat AS powiat, l.wojewodztwo AS wojewodztwo, l.historicalName AS historicalName, " +
							"l.collateralName AS collateralName, l.foreignName AS foreignName, l.foreignLatin AS foreignLatin")
	public Page<LocalityPlain> findPlainByName ( @Param ("name") String name, Pageable pageable );
	
	@Query (countQuery	= "MATCH (l:Locality) WHERE l._name STARTS WITH toLower({name}) RETURN count(l)",
			value		= "MATCH (l:Locality) WHERE l._name STARTS WITH toLower({name}) " +
						  "WITH l AS l, [l.historicalName, l.collateralName, l.foreignName, '('+l.foreignLatin+')'] AS names " +
						  "WITH l AS l, filter(n IN names WHERE n IS NOT NULL) AS names " +
						  "WITH l AS l, reduce(nms = head(names), n IN tail(names) | nms + ' / ' + n) AS names " +
						  "WITH l AS l, replace(names, '/ (', '(') AS names " +
						  "RETURN id(l) AS id, l.idTeryt AS idTeryt, l.name AS name, l.type AS type, l.parentName AS parentName, " +
								"names AS otherNames, l.gmina AS gmina, l.powiat AS powiat, l.wojewodztwo AS wojewodztwo")
	public Page<LocalitySimple> findSimpleByName ( @Param ("name") String name, Pageable pageable );

	@Query (countQuery	= "MATCH (l:Locality) WHERE l._name STARTS WITH toLower({name}) AND (size({wojew}) = 0 OR l.wojewodztwo = {wojew}) RETURN count(l)",
			value		= "MATCH (l:Locality) WHERE l._name STARTS WITH toLower({name}) AND (size({wojew}) = 0 OR l.wojewodztwo = {wojew}) " +
						  "WITH l AS l, [l.historicalName, l.collateralName, l.foreignName, '('+l.foreignLatin+')'] AS names " +
						  "WITH l AS l, filter(n IN names WHERE n IS NOT NULL) AS names " +
						  "WITH l AS l, reduce(nms = head(names), n IN tail(names) | nms + ' / ' + n) AS names " +
						  "WITH l AS l, replace(names, '/ (', '(') AS names " +
						  "RETURN id(l) AS id, l.idTeryt AS idTeryt, l.name AS name, l.type AS type, l.parentName AS parentName, " +
								"names AS otherNames, l.gmina AS gmina, l.powiat AS powiat, l.wojewodztwo AS wojewodztwo")
	public Page<LocalitySimple> findSimpleByNameAndWojew ( @Param ("name") String name, @Param("wojew") String wojew, Pageable pageable );

	@Query (countQuery	= 
				"MATCH (l:Locality) " +
				"WHERE (l._name STARTS WITH toLower({name}) " +
						"OR ({hist} = false AND l._historicalName STARTS WITH toLower({name})) " +
						"OR ({collat} = false AND l._collateralName STARTS WITH toLower({name})) " +
						"OR ({foreign} = false AND (l._foreignName STARTS WITH toLower({name}) OR l._foreignLatin STARTS WITH toLower({name})))) " +
					"AND ({kind} <> 'STANDALONE' OR NOT exists(l.parentName)) " +
					"AND ({kind} <> 'DEPENDENT' OR exists(l.parentName)) " +
					"AND (size({wojew}) = 0 OR l.wojewodztwo = {wojew}) " +
				"RETURN count(l)",
			value		= 
				"MATCH (l:Locality) " +
				"WHERE (l._name STARTS WITH toLower({name}) " +
						"OR ({hist} = false AND l._historicalName STARTS WITH toLower({name})) " +
						"OR ({collat} = false AND l._collateralName STARTS WITH toLower({name})) " +
						"OR ({foreign} = false AND (l._foreignName STARTS WITH toLower({name}) OR l._foreignLatin STARTS WITH toLower({name})))) " +
					"AND ({kind} <> 'STANDALONE' OR NOT exists(l.parentName)) " +
					"AND ({kind} <> 'DEPENDENT' OR exists(l.parentName)) " +
					"AND (size({wojew}) = 0 OR l.wojewodztwo = {wojew}) " +
				"WITH l AS l, [l.historicalName, l.collateralName, l.foreignName, '('+l.foreignLatin+')'] AS names " +
				"WITH l AS l, filter(n IN names WHERE n IS NOT NULL) AS names " +
				"WITH l AS l, reduce(nms = head(names), n IN tail(names) | nms + ' / ' + n) AS names " +
				"WITH l AS l, replace(names, '/ (', '(') AS names " +
				"RETURN id(l) AS id, l.idTeryt AS idTeryt, l.name AS name, l.type AS type, l.parentName AS parentName, " +
					"names AS otherNames, l.gmina AS gmina, l.powiat AS powiat, l.wojewodztwo AS wojewodztwo")
	public Page<LocalitySimple> findSimpleByCriteria ( @Param ("name") String name, @Param("hist") boolean hist, @Param("collat") boolean collat, @Param("foreign") boolean foreign, @Param("kind") Kind depend, @Param("wojew") String wojew, Pageable pageable );
	
	@Query ("MATCH (l:Locality) WHERE id(l) = {id} RETURN l")
	public Locality byId ( @Param ("id") Long id );
	
	@Query ("MATCH (l:Locality) RETURN DISTINCT l.wojewodztwo AS wojew ORDER BY wojew")
	public List<String> extractWojewodztwa ();
	
}
