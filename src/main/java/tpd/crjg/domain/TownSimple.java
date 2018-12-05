package tpd.crjg.domain;

import org.neo4j.ogm.annotation.typeconversion.Convert;
import org.springframework.data.neo4j.annotation.QueryResult;

/**
 * Nazwy historyczne, oboczne, obce, itp. zredukowane do jednego pola.
 */
@QueryResult
public class TownSimple {
	
	Long	id;
	
	String	name;
	
	String	type;
	
	String	parentName;
	
	String	otherNames;
	
	String	gmina;
	
	String	powiat;
	
	String	wojewodztwo;
	
	@Convert (CoordConverter.class)
	Coord	coord;
	
	public Long getId () {
		return id;
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
	
	public Coord getCoord () {
		return coord;
	}
	
}
