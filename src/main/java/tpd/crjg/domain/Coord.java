package tpd.crjg.domain;

public class Coord {
	
	private Double lat, lng;
	
	public Coord () {}
	
	public Coord ( Double lat, Double lng ) {
		this.lat = lat;
		this.lng = lng;
	}

	public Double getLat () {
		return lat;
	}
	
	public Double getLng () {
		return lng;
	}
	
}
