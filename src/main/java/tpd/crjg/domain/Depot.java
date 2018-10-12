package tpd.crjg.domain;

import static org.neo4j.ogm.annotation.Relationship.INCOMING;

import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Property;
import org.neo4j.ogm.annotation.Relationship;
import org.neo4j.ogm.annotation.Transient;

@NodeEntity (label = "Depot")
public class Depot {
	
	@Id
	@GeneratedValue
	private Long		id;
	
	@Property
	private String		name;
	
	@Property
	private double		lat;
	
	@Property
	private double		lng;
	
	@Relationship (type = "HAS", direction = INCOMING)
	private Locality	locality;
	
	@Transient
	private Long		localityRefId;
	
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
	
	public double getLat () {
		return lat;
	}
	
	public void setLat ( double lat ) {
		this.lat = lat;
	}
	
	public double getLng () {
		return lng;
	}
	
	public void setLng ( double lng ) {
		this.lng = lng;
	}
	
	public Locality getLocality () {
		return locality;
	}
	
	public void setLocality ( Locality locality ) {
		this.locality = locality;
	}
	
	public Long getLocalityRefId () {
		return localityRefId;
	}
	
	public void setLocalityRefId ( Long localityRefId ) {
		this.localityRefId = localityRefId;
	}
	
}
