package tpd.crjg.service;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.context.annotation.SessionScope;

import tpd.crjg.cntrl.LocalitySearchControler;
import tpd.crjg.domain.Locality;
import tpd.crjg.repo.LocalityRepo;

@Service
@SessionScope
public class LocalitySearchService {
	
	private static final int		PAGE_SIZE		= 12;
	
	private static final Sort		SORT_ORDER		= Sort.by("l.name", "l.wojewodztwo", "l.powiat", "l.gmina");
	
	private static final Pageable	FIRST_PAGE_REQ	= PageRequest.of(0, PAGE_SIZE, SORT_ORDER);
	
	private static Logger			log				= Logger.getLogger(LocalitySearchControler.class.getName());
	
	private String					nameKey;
	
	private Page<Locality>			currentPage;
	
	private List<Page<Locality>>	pages			= new ArrayList<Page<Locality>>();
	
	@Autowired
	private LocalityRepo			repo;
	
	public ResultsPage<Locality> firstPage ( String name ) {
		log.info("first page, name: " + name);
		if ( areCriteriaDifferent(name) ) {
			log.info("criteria are different");
			releasePages();
			nameKey = name;
			currentPage = repo.findByName(nameKey, FIRST_PAGE_REQ);
			pages.add(currentPage);
		}
		return PageConverter.convert(currentPage);
	}
	
	private boolean areCriteriaDifferent ( String name ) {
		return (StringUtils.hasText(name) ? !name.equalsIgnoreCase(nameKey) : StringUtils.hasText(nameKey));
	}
	
	public ResultsPage<Locality> nextPage () {
		if ( currentPage == null )
			return null;
		
		int nextPageNumber = currentPage.getNumber() + 1;
		
		if ( nextPageNumber < pages.size() )
			currentPage = pages.get(nextPageNumber);
		
		else if ( currentPage.hasNext() ) {
			Pageable nextPageReq = currentPage.nextPageable();
			currentPage = repo.findByName(nameKey, nextPageReq);
			pages.add(currentPage);
		}
		
		return PageConverter.convert(currentPage);
	}
	
	public ResultsPage<Locality> prevPage () {
		if ( currentPage == null )
			return null;
		
		int prevPageNumber = currentPage.getNumber() - 1;
		
		if ( prevPageNumber >= 0 )
			currentPage = pages.get(prevPageNumber);
		
		return PageConverter.convert(currentPage);
	}
	
	public ResultsPage<Locality> currPage () {
		return PageConverter.convert(currentPage);
	}
	
	public void releasePages () {
		nameKey = null;
		currentPage = null;
		pages.clear();
	}
	
}
