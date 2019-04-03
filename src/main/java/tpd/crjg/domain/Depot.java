package tpd.crjg.domain;

import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.Index;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.typeconversion.Convert;

import tpd.crjg.domain.converter.CoordConverter;

@NodeEntity (label = "Depot")
public class Depot {
	
	@Id
	@GeneratedValue
	private Long	id;
	
	private String	name;
	
	@Index
	@Convert (CoordConverter.class)
	private Coord	coord;
	
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
	
	public Coord getCoord () {
		return coord;
	}
	
	public void setCoord ( Coord coord ) {
		this.coord = coord;
	}
	
}
