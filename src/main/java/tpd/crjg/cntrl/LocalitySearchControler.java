package tpd.crjg.cntrl;

import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tpd.crjg.domain.LocalitySimple;
import tpd.crjg.pagination.SearchResultPage;
import tpd.crjg.service.LocalitySearchCriteria;
import tpd.crjg.service.LocalitySearchService;

@RestController
@RequestMapping ("/locality/search")
public class LocalitySearchControler {
	
	private static Logger	log	= Logger.getLogger(LocalitySearchControler.class.getName());
	
	@Autowired
	private LocalitySearchService	service;
	
	@GetMapping (	path = "/firstPage",
					produces = MediaType.APPLICATION_JSON_VALUE)
	public SearchResultPage<LocalitySimple> firstPage ( @ModelAttribute ("criteria") LocalitySearchCriteria criteria ) {
		log.info("firstPage");
		SearchResultPage<LocalitySimple> page = service.firstPage(criteria);
		return page;
	}
	
}
