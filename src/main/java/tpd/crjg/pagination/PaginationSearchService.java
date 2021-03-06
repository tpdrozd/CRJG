package tpd.crjg.pagination;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public abstract class PaginationSearchService<C extends SearchCriteria<C>, D> {
	
	private static Logger				log		= Logger.getLogger(PaginationSearchService.class.getName());
	
	private final Sort					SORT_ORDER;
	
	private C							criteria;
	
	private Pageable					nextPageReq;
	
	private SearchResultPage<D>			currentPage;
	
	private List<SearchResultPage<D>>	pages	= new ArrayList<SearchResultPage<D>>();
	
	public PaginationSearchService ( String... sortOrder ) {
		SORT_ORDER = Sort.by(sortOrder);
	}
	
	public SearchResultPage<D> firstPage ( C newCriteria, int pagingSize ) {
		log.info("first page, pagingSize: " + pagingSize + ", criteria: " + newCriteria.toString());
		
		if ( newCriteria.differentThen(this.criteria) ) {
			criteria = newCriteria;
			nextPageReq = PageRequest.of(0, pagingSize, SORT_ORDER);
			pages.clear();
			populatePage();
		}
		return currentPage;
	}
	
	public SearchResultPage<D> nextPage () {
		if ( currentPage == null )
			return null;
		
		int nextPageIndx = currentPage.getPageNumber();
		
		if ( nextPageIndx < pages.size() )
			currentPage = pages.get(nextPageIndx);
		
		else if ( currentPage.isHasNext() )
			populatePage();
		
		return currentPage;
	}
	
	public SearchResultPage<D> prevPage () {
		if ( currentPage == null )
			return null;
		
		int prevPageIndx = currentPage.getPageNumber() - 2;
		
		if ( prevPageIndx >= 0 )
			currentPage = pages.get(prevPageIndx);
		
		return currentPage;
	}
	
	public SearchResultPage<D> currPage () {
		return currentPage;
	}
	
	public void releasePages () {
		log.info("release pages");
		criteria = null;
		nextPageReq = null;
		currentPage = null;
		pages.clear();
	}
	
	private void populatePage () {
		Page<D> page = retrivePage(criteria, nextPageReq);
		nextPageReq = page.nextPageable();
		currentPage = PageConverter.convert(page);
		pages.add(currentPage);
	}
	
	protected abstract Page<D> retrivePage ( C criteria, Pageable pageable );
}
