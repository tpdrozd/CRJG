package tpd.crjg.cntrl;

import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tpd.crjg.domain.Locality;
import tpd.crjg.domain.LocalitySimple;
import tpd.crjg.pagination.SearchResultPage;
import tpd.crjg.repo.LocalityRepo;
import tpd.crjg.service.LocalitySearchCriteria;
import tpd.crjg.service.LocalitySearchService;

@RestController
@RequestMapping ("/locality/search")
public class LocalitySearchControler {
	
	private static Logger			log	= Logger.getLogger(LocalitySearchControler.class.getName());
	
	@Autowired
	private LocalitySearchService	service;
	
	@Autowired
	private LocalityRepo			repo;
	
	@PostMapping (path = "/firstPage", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public SearchResultPage<LocalitySimple> firstPageP ( @RequestBody LocalitySearchCriteria criteria ) {
		log.info("POST body: " + criteria.toString());
		return service.firstPage(criteria);
	}
	
	@GetMapping (path = "/nextPage", produces = MediaType.APPLICATION_JSON_VALUE)
	public SearchResultPage<LocalitySimple> nextPage () {
		return service.nextPage();
	}
	
	@GetMapping (path = "/prevPage", produces = MediaType.APPLICATION_JSON_VALUE)
	public SearchResultPage<LocalitySimple> prevPage () {
		return service.prevPage();
	}
	
	@GetMapping (path = "/currPage", produces = MediaType.APPLICATION_JSON_VALUE)
	public SearchResultPage<LocalitySimple> currPage () {
		return service.currPage();
	}
	
	@GetMapping (path = "/releasePages")
	public void releasePages () {
		service.releasePages();
	}
	
	@PostMapping (path = "/details", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public Locality details ( @RequestBody Long id ) {
		log.info("id: " + id);
		service.releasePages();
		return repo.byId(id);
	}
	
}
