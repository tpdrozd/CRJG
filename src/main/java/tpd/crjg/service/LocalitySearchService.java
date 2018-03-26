package tpd.crjg.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import tpd.crjg.domain.LocalitySimple;
import tpd.crjg.pagination.PaginationSearchService;
import tpd.crjg.repo.LocalitySearchRepo;

@Service
@SessionScope
public class LocalitySearchService extends PaginationSearchService<LocalitySearchCriteria, LocalitySimple> {
	
	@Autowired
	private LocalitySearchRepo repo;
	
	public LocalitySearchService () {
		super(12, "l.name", "l.wojewodztwo", "l.powiat", "l.gmina");
	}
	
	@Override
	protected Page<LocalitySimple> retrivePage ( LocalitySearchCriteria c, Pageable pageable ) {
		if ( c.isMatchingAtStart() )
			return repo.findSimpleByStartsWith(c.getNameAsLowerCase(), c.isHist(), c.isCollat(), c.isForeign(), c.getKind(), c.getWojew(), pageable);
		else if ( c.isMatchingAtEnd() )
			return repo.findSimpleByEndsWith(c.getNameAsLowerCase(), c.isHist(), c.isCollat(), c.isForeign(), c.getKind(), c.getWojew(), pageable);
		else
			return repo.findSimpleByContains(c.getNameAsLowerCase(), c.isHist(), c.isCollat(), c.isForeign(), c.getKind(), c.getWojew(), pageable);
	}
	
}
