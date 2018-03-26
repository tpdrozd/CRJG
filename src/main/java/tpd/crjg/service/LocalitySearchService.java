package tpd.crjg.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import tpd.crjg.domain.LocalitySimple;
import tpd.crjg.pagination.PaginationSearchService;
import tpd.crjg.repo.LocalityRepo;

@Service
@SessionScope
public class LocalitySearchService extends PaginationSearchService<LocalitySearchCriteria, LocalitySimple> {
	
	@Autowired
	private LocalityRepo repo;
	
	public LocalitySearchService () {
		super(12, "l.name", "l.wojewodztwo", "l.powiat", "l.gmina");
	}
	
	@Override
	protected Page<LocalitySimple> retrivePage ( LocalitySearchCriteria criteria, Pageable pageable ) {
		
		return repo.findSimpleByCriteria(criteria.getName(), criteria.isHist(), criteria.isCollat(), criteria.isForeign(), criteria.getKind(), criteria.getWojew(), pageable);
	}
	
}
