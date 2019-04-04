package tpd.crjg.cntrl;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import tpd.crjg.cntrl.request.AddDepot;
import tpd.crjg.domain.Depot;
import tpd.crjg.repo.TownRepo;
import tpd.crjg.service.DepotService;

@Controller
@RequestMapping ("/depot")
public class DepotCtrl {
	
	@Autowired
	private TownRepo		repo;
	
	@Autowired
	private DepotService depotService;
	
	@RequestMapping ("/edit")
	public String search ( Model m ) {
		List<String> wojewodztwa = repo.extractWojewodztwa();
		m.addAttribute("wojews", wojewodztwa);
		m.addAttribute("wojew", "");
		return "edit.jsp";
	}
	
	@PutMapping (path = "/save", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
	public @ResponseBody Depot saveDepot ( @RequestBody AddDepot addDepot ) {
		Depot depot = depotService.addDepot(addDepot.getTownId(), addDepot.getDepot());
		return depot;
	}
	
}
