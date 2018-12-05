package tpd.crjg.cntrl;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tpd.crjg.domain.Town;
import tpd.crjg.domain.TownSimple;
import tpd.crjg.pagination.SearchRequest;
import tpd.crjg.pagination.SearchResultPage;
import tpd.crjg.repo.TownRepo;
import tpd.crjg.service.TownSearchCriteria;
import tpd.crjg.service.TownSearchService;

@RestController
@RequestMapping ("/town/search")
public class TownSearchControler {
	
	private static Logger			log	= Logger.getLogger(TownSearchControler.class.getName());
	
	@Autowired
	private TownSearchService	service;
	
	@Autowired
	private TownRepo			repo;
	
	@PostMapping (path = "/firstPage", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
	public SearchResultPage<TownSimple> firstPage ( @RequestBody SearchRequest<TownSearchCriteria> request ) {
		log.info("POST body: " + request.toString());
		return service.firstPage(request.getCriteria(), request.getPagingSize());
	}
	
	@GetMapping (path = "/nextPage", produces = APPLICATION_JSON_VALUE)
	public SearchResultPage<TownSimple> nextPage () {
		return service.nextPage();
	}
	
	@GetMapping (path = "/prevPage", produces = APPLICATION_JSON_VALUE)
	public SearchResultPage<TownSimple> prevPage () {
		return service.prevPage();
	}
	
	@GetMapping (path = "/currPage", produces = APPLICATION_JSON_VALUE)
	public SearchResultPage<TownSimple> currPage () {
		return service.currPage();
	}
	
	@GetMapping (path = "/releasePages")
	public void releasePages () {
		service.releasePages();
	}
	
	@PostMapping (path = "/details", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
	public Town details ( @RequestBody Long id ) {
		log.info("id: " + id);
		service.releasePages();
		return repo.findById(id).get();
	}
	
}
