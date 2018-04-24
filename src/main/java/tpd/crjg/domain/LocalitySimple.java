package tpd.crjg.domain;

import org.springframework.data.neo4j.annotation.QueryResult;

/**
 * Nazwy historyczne, oboczne, obce, itp. zredukowane do jednego pola.
 */
@QueryResult
public class LocalitySimple {
	
	Long	id;
	
	String	idTeryt;
	
	String	name;
	
	String	type;
	
	String	parentName;
	
	String	otherNames;
	
	String	gmina;
	
	String	powiat;
	
	String	wojewodztwo;
	
	double	lat;
	
	double	lng;
	
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
	
	public String getOtherNames () {
		return otherNames;
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
	
	public double getLat () {
		return lat;
	}
	
	public double getLng () {
		return lng;
	}
}
