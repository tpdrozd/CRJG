package tpd.crjg.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tpd.crjg.domain.Depot;
import tpd.crjg.domain.Locality;
import tpd.crjg.repo.LocalityRepo;

@Service
public class DepotService {
	
	@Autowired
	private LocalityRepo	localityRepo;
	
	public Locality save ( Depot depot ) {
		Locality locality = localityRepo.findById(depot.getLocalityRefId()).get();
		// TODO sprawdzić unikalność nazwy dodawanego przystanku
		locality.getDepots().add(depot);
		Locality l = localityRepo.save(locality, 1);
		return l;
	} // end of save
	
} // end of DepotService
