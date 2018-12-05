package tpd.crjg.domain;

import org.neo4j.driver.internal.InternalPoint2D;
import org.neo4j.driver.v1.types.Point;
import org.neo4j.ogm.typeconversion.AttributeConverter;

public class CoordConverter implements AttributeConverter<Coord, Point> {
	
	@Override
	public Point toGraphProperty ( Coord coord ) {
		return coord != null ? new InternalPoint2D(4326, coord.getLng(), coord.getLat()) : null;
	}
	
	@Override
	public Coord toEntityAttribute ( Point point ) {
		return point != null ? new Coord(point.y(), point.x()) : null;
	}
	
}
