package tpd.crjg.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tpd.crjg.domain.Depot;
import tpd.crjg.domain.Locality;
import tpd.crjg.repo.DepotRepo;
import tpd.crjg.repo.LocalityRepo;

@Service
public class DepotService {
	
	@Autowired
	private LocalityRepo	localityRepo;
	
	@Autowired
	private DepotRepo		depotRepo;
	
	public Depot save ( Depot depot ) {
		Locality locality = localityRepo.byId(depot.getLocalityRefId());
		depot.setLocality(locality);
		Depot d = depotRepo.save(depot, 1);
		return d;
	} // end of save
	
} // end of DepotService
