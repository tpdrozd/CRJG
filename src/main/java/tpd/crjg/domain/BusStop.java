package tpd.crjg.domain;

import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Property;
import org.neo4j.ogm.annotation.Relationship;

@NodeEntity (label = "BusStop")
public class BusStop {
	
	@Id
	@GeneratedValue
	private Long		id;
	
	@Property
	private int			orderIndex;
	
	@Property
	private String		arrival;
	
	@Property
	private String		departure;
	
	@Relationship (type = "IN")
	private Town	locality;
	
	@Relationship (type = "AT")
	private Depot		depot;
	
	public Long getId () {
		return id;
	}
	
	public void setId ( Long id ) {
		this.id = id;
	}
	
	public int getOrderIndex () {
		return orderIndex;
	}
	
	public void setOrderIndex ( int orderIndex ) {
		this.orderIndex = orderIndex;
	}
	
	public String getArrival () {
		return arrival;
	}
	
	public void setArrival ( String arrival ) {
		this.arrival = arrival;
	}
	
	public String getDeparture () {
		return departure;
	}
	
	public void setDeparture ( String departure ) {
		this.departure = departure;
	}
	
	public Town getLocality () {
		return locality;
	}
	
	public void setLocality ( Town locality ) {
		this.locality = locality;
	}
	
	public Depot getDepot () {
		return depot;
	}
	
	public void setDepot ( Depot depot ) {
		this.depot = depot;
	}
	
}
