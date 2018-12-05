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
	private Town	from;
	
	@Relationship (type = "TO")
	private Town	to;
	
	@Relationship (type = "CONTAIN")
	private List<Stop>	stops;

	public Long getId () {
		return id;
	}

	public void setId ( Long id ) {
		this.id = id;
	}

	public Town getFrom () {
		return from;
	}

	public void setFrom ( Town from ) {
		this.from = from;
	}

	public Town getTo () {
		return to;
	}

	public void setTo ( Town to ) {
		this.to = to;
	}

	public List<Stop> getStops () {
		return stops;
	}

	public void setStops ( List<Stop> stops ) {
		this.stops = stops;
	}
	
}
