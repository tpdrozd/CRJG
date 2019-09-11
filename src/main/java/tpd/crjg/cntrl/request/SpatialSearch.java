package tpd.crjg.cntrl.request;

import tpd.crjg.domain.Coord;

public class SpatialSearch {

	private Coord coord;
	
	private int radius;

	public Coord getCoord () {
		return coord;
	}

	public void setCoord ( Coord coord ) {
		this.coord = coord;
	}

	public int getRadius () {
		return radius;
	}

	public void setRadius ( int radius ) {
		this.radius = radius;
	}
	
}
