package tpd.crjg.service;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tpd.crjg.domain.Depot;
import tpd.crjg.domain.Town;
import tpd.crjg.repo.TownRepo;

@Service
public class TownService {
	
	private static final Logger log = Logger.getLogger(TownService.class.getName());
	
	@Autowired
	private TownRepo townRepo;
	
	public Town addDepot ( Long townId, Depot depot ) {
		Town town = townRepo.findById(townId).get();
		
		List<Depot> depots = town.getDepots();
		if ( depots == null ) {
			depots = new ArrayList<Depot> ();
			town.setDepots(depots);
		}
		
		// TODO sprawdzić unikalność nazwy dodawanego przystanku
		depots.add(depot);
		Town t = townRepo.save(town, 1);
		
		log.info(depot.getName() + " " + depot.getCoord().getLat() + " " + depot.getCoord().getLng());
		
		return t;
	} // end of save
	
} // end of DepotService
