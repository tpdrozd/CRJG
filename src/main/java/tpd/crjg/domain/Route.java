package tpd.crjg.domain;

import java.util.List;

import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

@NodeEntity (label = "Route")
public class Route {
	
	@Id
	@GeneratedValue
	private Long		id;
	
	@Relationship (type = "FROM")
	private Locality	from;
	
	@Relationship (type = "TO")
	private Locality	to;
	
	@Relationship (type = "CONTAIN")
	private List<Stop>	stops;

	public Long getId () {
		return id;
	}

	public void setId ( Long id ) {
		this.id = id;
	}

	public Locality getFrom () {
		return from;
	}

	public void setFrom ( Locality from ) {
		this.from = from;
	}

	public Locality getTo () {
		return to;
	}

	public void setTo ( Locality to ) {
		this.to = to;
	}

	public List<Stop> getStops () {
		return stops;
	}

	public void setStops ( List<Stop> stops ) {
		this.stops = stops;
	}
	
}
