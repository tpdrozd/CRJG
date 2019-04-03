package tpd.crjg.domain.converter;

import java.util.logging.Logger;

import org.neo4j.driver.v1.types.Point;
import org.neo4j.ogm.typeconversion.AttributeConverter;
import org.neo4j.ogm.types.spatial.GeographicPoint2d;

import tpd.crjg.domain.Coord;

public class CoordConverter implements AttributeConverter<Coord, Object> { // todo use Object
	
	private static final Logger log = Logger.getLogger(CoordConverter.class.getName());
	
	@Override
	public GeographicPoint2d toGraphProperty ( Coord coord ) {
		log.info("toGraph");
		return coord != null ? new GeographicPoint2d(coord.getLat(), coord.getLng()) : null;
	}
	
	@Override
	public Coord toEntityAttribute ( Object point ) {
		if (point instanceof Point) {
			log.info("toEntity instance of Point");
			Point p = (Point)point;
			return point != null ? new Coord(p.y(), p.x()) : null;
		}
		else { // instanceof GeographicPoint2d
			log.info("toEntity instance of GeographicPoint2d");
			GeographicPoint2d p = (GeographicPoint2d) point;
			return point != null ? new Coord(p.getLatitude(), p.getLongitude()) : null;
		}
	}
}
