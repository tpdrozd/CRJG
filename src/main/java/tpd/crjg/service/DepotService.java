package tpd.crjg.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tpd.crjg.domain.Depot;
import tpd.crjg.domain.Town;
import tpd.crjg.repo.TownRepo;

@Service
public class DepotService {
	
	@Autowired
	private TownRepo	localityRepo;
	
	public Town save ( Depot depot ) {
		Town locality = localityRepo.findById(depot.getLocalityRefId()).get();
		// TODO sprawdzić unikalność nazwy dodawanego przystanku
		locality.getDepots().add(depot);
		Town l = localityRepo.save(locality, 1);
		return l;
	} // end of save
	
} // end of DepotService
