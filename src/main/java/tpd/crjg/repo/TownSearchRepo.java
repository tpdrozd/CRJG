package tpd.crjg.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tpd.crjg.domain.Town;
import tpd.crjg.domain.TownSimple;
import tpd.crjg.service.TownSearchCriteria.Kind;

@Repository
public interface TownSearchRepo extends Neo4jRepository<Town, Long> {

	@Query (countQuery	= 
				"MATCH (t:Town) " +
				"WHERE (t.lc_name STARTS WITH {name} " +
						"OR ({hist} = false AND t.lc_historicalName STARTS WITH {name}) " +
						"OR ({collat} = false AND t.lc_collateralName STARTS WITH {name}) " +
						"OR ({foreign} = false AND (t.lc_foreignName STARTS WITH {name} OR t.lc_foreignLatin STARTS WITH {name}))) " +
					"AND ({kind} <> 'STANDALONE' OR NOT exists(t.parentName)) " +
					"AND ({kind} <> 'DEPENDENT' OR exists(t.parentName)) " +
					"AND (size({wojew}) = 0 OR t.wojewodztwo = {wojew}) " +
				"RETURN count(t)",
			value		= 
				"MATCH (t:Town) " +
				"WHERE (t.lc_name STARTS WITH {name} " +
						"OR ({hist} = false AND t.lc_historicalName STARTS WITH {name}) " +
						"OR ({collat} = false AND t.lc_collateralName STARTS WITH {name}) " +
						"OR ({foreign} = false AND (t.lc_foreignName STARTS WITH {name} OR t.lc_foreignLatin STARTS WITH {name}))) " +
					"AND ({kind} <> 'STANDALONE' OR NOT exists(t.parentName)) " +
					"AND ({kind} <> 'DEPENDENT' OR exists(t.parentName)) " +
					"AND (size({wojew}) = 0 OR t.wojewodztwo = {wojew}) " +
				"WITH t AS t, [t.historicalName, t.collateralName, t.foreignName, '('+t.foreignLatin+')'] AS names " +
				"WITH t AS t, filter(n IN names WHERE n IS NOT NULL) AS names " +
				"WITH t AS t, reduce(nms = head(names), n IN tail(names) | nms + ' / ' + n) AS names " +
				"WITH t AS t, replace(names, '/ (', '(') AS names " +
				"RETURN id(t) AS id, t.name AS name, t.type AS type, t.parentName AS parentName, " +
					"names AS otherNames, t.gmina AS gmina, t.powiat AS powiat, t.wojewodztwo AS wojewodztwo, t.coord AS coord")
	public Page<TownSimple> findSimpleByStartsWith (
		@Param ("name") String name,
		@Param ("hist") boolean hist,
		@Param ("collat") boolean collat,
		@Param ("foreign") boolean foreign,
		@Param ("kind") Kind depend,
		@Param ("wojew") String wojew,
		Pageable pageable );
	
	@Query (countQuery	= 
				"MATCH (t:Locality) " +
				"WHERE (t.lc_name ENDS WITH {name} " +
						"OR ({hist} = false AND t.lc_historicalName ENDS WITH {name}) " +
						"OR ({collat} = false AND t.lc_collateralName ENDS WITH {name}) " +
						"OR ({foreign} = false AND (t.lc_foreignName ENDS WITH {name} OR t.lc_foreignLatin ENDS WITH {name}))) " +
					"AND ({kind} <> 'STANDALONE' OR NOT exists(t.parentName)) " +
					"AND ({kind} <> 'DEPENDENT' OR exists(t.parentName)) " +
					"AND (size({wojew}) = 0 OR t.wojewodztwo = {wojew}) " +
				"RETURN count(t)",
			value		= 
				"MATCH (t:Locality) " +
				"WHERE (t._name ENDS WITH {name} " +
						"OR ({hist} = false AND t.lc_historicalName ENDS WITH {name}) " +
						"OR ({collat} = false AND t.lc_collateralName ENDS WITH {name}) " +
						"OR ({foreign} = false AND (t.lc_foreignName ENDS WITH {name} OR t.lc_foreignLatin ENDS WITH {name}))) " +
					"AND ({kind} <> 'STANDALONE' OR NOT exists(t.parentName)) " +
					"AND ({kind} <> 'DEPENDENT' OR exists(t.parentName)) " +
					"AND (size({wojew}) = 0 OR t.wojewodztwo = {wojew}) " +
				"WITH t AS t, [t.historicalName, t.collateralName, t.foreignName, '('+t.foreignLatin+')'] AS names " +
				"WITH t AS t, filter(n IN names WHERE n IS NOT NULL) AS names " +
				"WITH t AS t, reduce(nms = head(names), n IN tail(names) | nms + ' / ' + n) AS names " +
				"WITH t AS t, replace(names, '/ (', '(') AS names " +
				"RETURN id(t) AS id, t.name AS name, t.type AS type, t.parentName AS parentName, " +
					"names AS otherNames, t.gmina AS gmina, t.powiat AS powiat, t.wojewodztwo AS wojewodztwo, t.coord AS coord")
	public Page<TownSimple> findSimpleByEndsWith (
		@Param ("name") String name,
		@Param ("hist") boolean hist,
		@Param ("collat") boolean collat,
		@Param ("foreign") boolean foreign,
		@Param ("kind") Kind depend,
		@Param ("wojew") String wojew,
		Pageable pageable );
	
	@Query (countQuery	= 
				"MATCH (t:Locality) " +
				"WHERE (t.lc_name CONTAINS {name} " +
						"OR ({hist} = false AND t.lc_historicalName CONTAINS {name}) " +
						"OR ({collat} = false AND t.lc_collateralName CONTAINS {name}) " +
						"OR ({foreign} = false AND (t.lc_foreignName CONTAINS {name} OR t.lc_foreignLatin CONTAINS {name}))) " +
					"AND ({kind} <> 'STANDALONE' OR NOT exists(t.parentName)) " +
					"AND ({kind} <> 'DEPENDENT' OR exists(t.parentName)) " +
					"AND (size({wojew}) = 0 OR t.wojewodztwo = {wojew}) " +
				"RETURN count(t)",
			value		= 
				"MATCH (t:Locality) " +
				"WHERE (t.lc_name CONTAINS {name} " +
						"OR ({hist} = false AND t.lc_historicalName CONTAINS {name}) " +
						"OR ({collat} = false AND t.lc_collateralName CONTAINS {name}) " +
						"OR ({foreign} = false AND (t.lc_foreignName CONTAINS {name} OR t.lc_foreignLatin CONTAINS {name}))) " +
					"AND ({kind} <> 'STANDALONE' OR NOT exists(t.parentName)) " +
					"AND ({kind} <> 'DEPENDENT' OR exists(t.parentName)) " +
					"AND (size({wojew}) = 0 OR t.wojewodztwo = {wojew}) " +
				"WITH t AS t, [t.historicalName, t.collateralName, t.foreignName, '('+t.foreignLatin+')'] AS names " +
				"WITH t AS t, filter(n IN names WHERE n IS NOT NULL) AS names " +
				"WITH t AS t, reduce(nms = head(names), n IN tail(names) | nms + ' / ' + n) AS names " +
				"WITH t AS t, replace(names, '/ (', '(') AS names " +
				"RETURN id(t) AS id, t.name AS name, t.type AS type, t.parentName AS parentName, " +
					"names AS otherNames, t.gmina AS gmina, t.powiat AS powiat, t.wojewodztwo AS wojewodztwo, t.coord AS coord")
	public Page<TownSimple> findSimpleByContains (
		@Param ("name") String name,
		@Param ("hist") boolean hist,
		@Param ("collat") boolean collat,
		@Param ("foreign") boolean foreign,
		@Param ("kind") Kind depend,
		@Param ("wojew") String wojew,
		Pageable pageable );
	
}
