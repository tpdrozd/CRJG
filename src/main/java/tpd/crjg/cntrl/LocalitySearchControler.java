package tpd.crjg.cntrl;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tpd.crjg.domain.Locality;
import tpd.crjg.domain.LocalitySimple;
import tpd.crjg.pagination.SearchRequest;
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
	
	@PostMapping (path = "/firstPage", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
	public SearchResultPage<LocalitySimple> firstPage ( @RequestBody SearchRequest<LocalitySearchCriteria> request ) {
		log.info("POST body: " + request.toString());
		return service.firstPage(request.getCriteria(), request.getPagingSize());
	}
	
	@GetMapping (path = "/nextPage", produces = APPLICATION_JSON_VALUE)
	public SearchResultPage<LocalitySimple> nextPage () {
		return service.nextPage();
	}
	
	@GetMapping (path = "/prevPage", produces = APPLICATION_JSON_VALUE)
	public SearchResultPage<LocalitySimple> prevPage () {
		return service.prevPage();
	}
	
	@GetMapping (path = "/currPage", produces = APPLICATION_JSON_VALUE)
	public SearchResultPage<LocalitySimple> currPage () {
		return service.currPage();
	}
	
	@GetMapping (path = "/releasePages")
	public void releasePages () {
		service.releasePages();
	}
	
	@PostMapping (path = "/details", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
	public Locality details ( @RequestBody Long id ) {
		log.info("id: " + id);
		service.releasePages();
		return repo.findById(id, 1).get();
	}
	
}
