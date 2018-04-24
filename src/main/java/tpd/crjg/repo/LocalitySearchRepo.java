package tpd.crjg.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tpd.crjg.domain.Locality;
import tpd.crjg.domain.LocalitySimple;
import tpd.crjg.service.LocalitySearchCriteria.Kind;

@Repository
public interface LocalitySearchRepo extends Neo4jRepository<Locality, Long> {

	@Query (countQuery	= 
				"MATCH (l:Locality) " +
				"WHERE (l._name STARTS WITH {name} " +
						"OR ({hist} = false AND l._historicalName STARTS WITH {name}) " +
						"OR ({collat} = false AND l._collateralName STARTS WITH {name}) " +
						"OR ({foreign} = false AND (l._foreignName STARTS WITH {name} OR l._foreignLatin STARTS WITH {name}))) " +
					"AND ({kind} <> 'STANDALONE' OR NOT exists(l.parentName)) " +
					"AND ({kind} <> 'DEPENDENT' OR exists(l.parentName)) " +
					"AND (size({wojew}) = 0 OR l.wojewodztwo = {wojew}) " +
				"RETURN count(l)",
			value		= 
				"MATCH (l:Locality) " +
				"WHERE (l._name STARTS WITH {name} " +
						"OR ({hist} = false AND l._historicalName STARTS WITH {name}) " +
						"OR ({collat} = false AND l._collateralName STARTS WITH {name}) " +
						"OR ({foreign} = false AND (l._foreignName STARTS WITH {name} OR l._foreignLatin STARTS WITH {name}))) " +
					"AND ({kind} <> 'STANDALONE' OR NOT exists(l.parentName)) " +
					"AND ({kind} <> 'DEPENDENT' OR exists(l.parentName)) " +
					"AND (size({wojew}) = 0 OR l.wojewodztwo = {wojew}) " +
				"WITH l AS l, [l.historicalName, l.collateralName, l.foreignName, '('+l.foreignLatin+')'] AS names " +
				"WITH l AS l, filter(n IN names WHERE n IS NOT NULL) AS names " +
				"WITH l AS l, reduce(nms = head(names), n IN tail(names) | nms + ' / ' + n) AS names " +
				"WITH l AS l, replace(names, '/ (', '(') AS names " +
				"RETURN id(l) AS id, l.idTeryt AS idTeryt, l.name AS name, l.type AS type, l.parentName AS parentName, " +
					"names AS otherNames, l.gmina AS gmina, l.powiat AS powiat, l.wojewodztwo AS wojewodztwo, l.lat AS lat, l.lon AS lng")
	public Page<LocalitySimple> findSimpleByStartsWith (
		@Param ("name") String name,
		@Param ("hist") boolean hist,
		@Param ("collat") boolean collat,
		@Param ("foreign") boolean foreign,
		@Param ("kind") Kind depend,
		@Param ("wojew") String wojew,
		Pageable pageable );
	
	@Query (countQuery	= 
				"MATCH (l:Locality) " +
				"WHERE (l._name ENDS WITH {name} " +
						"OR ({hist} = false AND l._historicalName ENDS WITH {name}) " +
						"OR ({collat} = false AND l._collateralName ENDS WITH {name}) " +
						"OR ({foreign} = false AND (l._foreignName ENDS WITH {name} OR l._foreignLatin ENDS WITH {name}))) " +
					"AND ({kind} <> 'STANDALONE' OR NOT exists(l.parentName)) " +
					"AND ({kind} <> 'DEPENDENT' OR exists(l.parentName)) " +
					"AND (size({wojew}) = 0 OR l.wojewodztwo = {wojew}) " +
				"RETURN count(l)",
			value		= 
				"MATCH (l:Locality) " +
				"WHERE (l._name ENDS WITH {name} " +
						"OR ({hist} = false AND l._historicalName ENDS WITH {name}) " +
						"OR ({collat} = false AND l._collateralName ENDS WITH {name}) " +
						"OR ({foreign} = false AND (l._foreignName ENDS WITH {name} OR l._foreignLatin ENDS WITH {name}))) " +
					"AND ({kind} <> 'STANDALONE' OR NOT exists(l.parentName)) " +
					"AND ({kind} <> 'DEPENDENT' OR exists(l.parentName)) " +
					"AND (size({wojew}) = 0 OR l.wojewodztwo = {wojew}) " +
				"WITH l AS l, [l.historicalName, l.collateralName, l.foreignName, '('+l.foreignLatin+')'] AS names " +
				"WITH l AS l, filter(n IN names WHERE n IS NOT NULL) AS names " +
				"WITH l AS l, reduce(nms = head(names), n IN tail(names) | nms + ' / ' + n) AS names " +
				"WITH l AS l, replace(names, '/ (', '(') AS names " +
				"RETURN id(l) AS id, l.idTeryt AS idTeryt, l.name AS name, l.type AS type, l.parentName AS parentName, " +
					"names AS otherNames, l.gmina AS gmina, l.powiat AS powiat, l.wojewodztwo AS wojewodztwo, l.lat AS lat, l.lon AS lng")
	public Page<LocalitySimple> findSimpleByEndsWith (
		@Param ("name") String name,
		@Param ("hist") boolean hist,
		@Param ("collat") boolean collat,
		@Param ("foreign") boolean foreign,
		@Param ("kind") Kind depend,
		@Param ("wojew") String wojew,
		Pageable pageable );
	
	@Query (countQuery	= 
				"MATCH (l:Locality) " +
				"WHERE (l._name CONTAINS {name} " +
						"OR ({hist} = false AND l._historicalName CONTAINS {name}) " +
						"OR ({collat} = false AND l._collateralName CONTAINS {name}) " +
						"OR ({foreign} = false AND (l._foreignName CONTAINS {name} OR l._foreignLatin CONTAINS {name}))) " +
					"AND ({kind} <> 'STANDALONE' OR NOT exists(l.parentName)) " +
					"AND ({kind} <> 'DEPENDENT' OR exists(l.parentName)) " +
					"AND (size({wojew}) = 0 OR l.wojewodztwo = {wojew}) " +
				"RETURN count(l)",
			value		= 
				"MATCH (l:Locality) " +
				"WHERE (l._name CONTAINS {name} " +
						"OR ({hist} = false AND l._historicalName CONTAINS {name}) " +
						"OR ({collat} = false AND l._collateralName CONTAINS {name}) " +
						"OR ({foreign} = false AND (l._foreignName CONTAINS {name} OR l._foreignLatin CONTAINS {name}))) " +
					"AND ({kind} <> 'STANDALONE' OR NOT exists(l.parentName)) " +
					"AND ({kind} <> 'DEPENDENT' OR exists(l.parentName)) " +
					"AND (size({wojew}) = 0 OR l.wojewodztwo = {wojew}) " +
				"WITH l AS l, [l.historicalName, l.collateralName, l.foreignName, '('+l.foreignLatin+')'] AS names " +
				"WITH l AS l, filter(n IN names WHERE n IS NOT NULL) AS names " +
				"WITH l AS l, reduce(nms = head(names), n IN tail(names) | nms + ' / ' + n) AS names " +
				"WITH l AS l, replace(names, '/ (', '(') AS names " +
				"RETURN id(l) AS id, l.idTeryt AS idTeryt, l.name AS name, l.type AS type, l.parentName AS parentName, " +
					"names AS otherNames, l.gmina AS gmina, l.powiat AS powiat, l.wojewodztwo AS wojewodztwo, l.lat AS lat, l.lon AS lng")
	public Page<LocalitySimple> findSimpleByContains (
		@Param ("name") String name,
		@Param ("hist") boolean hist,
		@Param ("collat") boolean collat,
		@Param ("foreign") boolean foreign,
		@Param ("kind") Kind depend,
		@Param ("wojew") String wojew,
		Pageable pageable );
	
}
