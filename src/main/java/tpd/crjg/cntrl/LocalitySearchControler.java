package tpd.crjg.cntrl;

import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tpd.crjg.domain.Locality;
import tpd.crjg.service.LocalitySearchService;
import tpd.crjg.service.ResultsPage;

@RestController
@RequestMapping ("/locality/search")
public class LocalitySearchControler {
	
	private static Logger	log	= Logger.getLogger(LocalitySearchControler.class.getName());
	
	@Autowired
	LocalitySearchService	service;
	
	@GetMapping (	path = "/name/{name}/firstPage",
					produces = MediaType.APPLICATION_JSON_VALUE)
	public ResultsPage<Locality> firstPage ( @PathVariable String name ) {
		log.info("firstPage");
		ResultsPage<Locality> page = service.firstPage(name);
		return page;
	}
	
}
