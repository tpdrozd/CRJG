package tpd.crjg.service;

import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tpd.crjg.domain.Depot;
import tpd.crjg.domain.Town;
import tpd.crjg.repo.DepotRepo;
import tpd.crjg.repo.TownRepo;

@Service
public class DepotService {
	
	private static final Logger	log	= Logger.getLogger(DepotService.class.getName());
	
	@Autowired
	private TownRepo			townRepo;
	
	@Autowired
	private DepotRepo			depotRepo;
	
	public Depot addDepot ( Long townId, Depot depot ) {
		Town town = townRepo.findById(townId).get();
		
		// TODO sprawdzić unikalność nazwy dodawanego przystanku
		
		depot.setTown(town);
		Depot d = depotRepo.save(depot, 1);
		
		log.info(depot.getName() + " " + depot.getCoord().getLat() + " " + depot.getCoord().getLng());
		
		return d;
	} // end of save

} // end of DepotService
