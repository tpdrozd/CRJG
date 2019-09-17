package tpd.crjg.cntrl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tpd.crjg.cntrl.request.Distance;
import tpd.crjg.cntrl.request.SpatialSearch;
import tpd.crjg.domain.Town;
import tpd.crjg.repo.TownRepo;

@RestController
@RequestMapping ("/spatial")
public class SpatialCtrl {
	
	@Autowired
	private TownRepo townRepo;
	
	@RequestMapping ("/towns")
	public List<Town> findTowns ( @RequestBody SpatialSearch ss ) {
		return townRepo.findSpatial(ss.getCoord().getLat(), ss.getCoord().getLng(), ss.getRadius());
	}
	
	@RequestMapping ("/distance")
	public int distance ( @RequestBody Distance distance ) {
		return townRepo.distance(distance.getPlaceAId(), distance.getPlaceBId());
	}
	
}
