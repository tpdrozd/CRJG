package tpd.crjg.cntrl;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import tpd.crjg.domain.Depot;
import tpd.crjg.domain.Town;
import tpd.crjg.service.DepotService;

@Controller
@RequestMapping ("/depot")
public class DepotCtrl {
	
	@Autowired
	private DepotService depotService;
	
	@PutMapping (path = "/save", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
	public @ResponseBody Town saveDepot ( @RequestBody Depot depot ) {
		Town l = depotService.save(depot);
		return l;
	}
	
}
