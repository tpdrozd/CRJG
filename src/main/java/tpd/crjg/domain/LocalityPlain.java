package tpd.crjg.domain;

import org.springframework.data.neo4j.annotation.QueryResult;

/**
 * Nazwy historyczne, oboczne, obce, itp. zachowane jako osobne pola.
 */
@QueryResult
public class LocalityPlain {
	
	Long	id;
	
	String	idTeryt;
	
	String	name;
	
	String	type;
	
	String	parentName;
	
	String	historicalName;
	
	String	collateralName;
	
	String	foreignName;
	
	String	foreignLatin;
	
	String	gmina;
	
	String	powiat;
	
	String	wojewodztwo;
	
	public Long getId () {
		return id;
	}
	
	public String getIdTeryt () {
		return idTeryt;
	}
	
	public String getName () {
		return name;
	}
	
	public String getType () {
		return type;
	}
	
	public String getParentName () {
		return parentName;
	}
	
	public String getHistoricalName () {
		return historicalName;
	}
	
	public String getCollateralName () {
		return collateralName;
	}
	
	public String getForeignName () {
		return foreignName;
	}
	
	public String getForeignLatin () {
		return foreignLatin;
	}
	
	public String getGmina () {
		return gmina;
	}
	
	public String getPowiat () {
		return powiat;
	}
	
	public String getWojewodztwo () {
		return wojewodztwo;
	}
	
}
