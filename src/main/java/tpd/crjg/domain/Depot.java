package tpd.crjg.domain;

import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.Index;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;
import org.neo4j.ogm.annotation.typeconversion.Convert;

import tpd.crjg.domain.converter.CoordConverter;

@NodeEntity (label = "Depot")
public class Depot {
	
	@Id
	@GeneratedValue
	private Long	id;
	
	private String	name;
	
	private String	latitude;
	
	private String	longitude;
	
	@Index
	@Convert (CoordConverter.class)
	private Coord	coord;
	
	@Relationship (type = "WITHIN")
	private Town	town;
	
	public Long getId () {
		return id;
	}
	
	public void setId ( Long id ) {
		this.id = id;
	}
	
	public String getName () {
		return name;
	}
	
	public void setName ( String name ) {
		this.name = name;
	}
	
	public String getLatitude () {
		return latitude;
	}
	
	public void setLatitude ( String latitude ) {
		this.latitude = latitude;
	}
	
	public String getLongitude () {
		return longitude;
	}
	
	public void setLongitude ( String longitude ) {
		this.longitude = longitude;
	}
	
	public Coord getCoord () {
		return coord;
	}
	
	public void setCoord ( Coord coord ) {
		this.coord = coord;
	}
	
	public Town getTown () {
		return town;
	}
	
	public void setTown ( Town town ) {
		this.town = town;
	}
	
}
