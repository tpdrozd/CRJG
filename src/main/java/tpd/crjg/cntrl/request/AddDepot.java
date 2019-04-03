package tpd.crjg.cntrl.request;

import tpd.crjg.domain.Depot;

public class AddDepot {
	
	private Long	townId;
	
	private Depot	depot;
	
	public Long getTownId () {
		return townId;
	}
	
	public void setTownId ( Long townId ) {
		this.townId = townId;
	}
	
	public Depot getDepot () {
		return depot;
	}
	
	public void setDepot ( Depot depot ) {
		this.depot = depot;
	}
	
}
