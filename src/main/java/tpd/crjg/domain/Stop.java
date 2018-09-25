package tpd.crjg.domain;

import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Property;
import org.neo4j.ogm.annotation.Relationship;

@NodeEntity (label = "Stop")
public class Stop {
	
	@Id @GeneratedValue
	private Long		id;
	
	@Property
	private int			orderIndex;
	
	@Relationship (type = "IN")
	private Locality	locality;
	
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

	public Locality getLocality () {
		return locality;
	}

	public void setLocality ( Locality locality ) {
		this.locality = locality;
	}

	public Depot getDepot () {
		return depot;
	}

	public void setDepot ( Depot depot ) {
		this.depot = depot;
	}
	
}
