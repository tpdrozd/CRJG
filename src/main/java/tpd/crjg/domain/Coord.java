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
	
	public String formatLat () {
		return val2str(lat) + val2ns(lat);
	}
	
	public String formatLng () {
		return val2str(lng) + val2ew(lng);
	}
	
	private static String val2str ( double val ) {
		// deg
		double value = Math.abs(val);
		int deg = (int) Math.floor(value);
		
		// min
		value = 60 * (value % 1);
		int min = (int) Math.floor(value);
		
		// sec
		value = 60 * (value % 1);
		int sec = (int) Math.rint(value);
		
		if ( sec == 60 ) {
			min += 1;
			sec = 0;
		}
		if ( min == 60 ) {
			deg += 1;
			min = 0;
		}
		
		return deg + "°" + min + "'" + sec + "\"";
	}
	
	private static String val2ns ( double val ) {
		return val >= 0 ? "N" : "S";
	}
	
	private static String val2ew ( double val ) {
		return val >= 0 ? "E" : "W";
	}
	
}
