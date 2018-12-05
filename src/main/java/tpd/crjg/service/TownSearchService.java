package tpd.crjg.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import tpd.crjg.domain.TownSimple;
import tpd.crjg.pagination.PaginationSearchService;
import tpd.crjg.repo.TownSearchRepo;

@Service
@SessionScope
public class TownSearchService extends PaginationSearchService<TownSearchCriteria, TownSimple> {
	
	@Autowired
	private TownSearchRepo repo;
	
	public TownSearchService () {
		super("t.name", "t.wojewodztwo", "t.powiat", "t.gmina");
	}
	
	@Override
	protected Page<TownSimple> retrivePage ( TownSearchCriteria c, Pageable pageable ) {
		if ( c.isMatchingAtStart() )
			return repo.findSimpleByStartsWith(c.getNameAsLowerCase(), c.isHist(), c.isCollat(), c.isForeign(), c.getKind(), c.getWojew(), pageable);
		else if ( c.isMatchingAtEnd() )
			return repo.findSimpleByEndsWith(c.getNameAsLowerCase(), c.isHist(), c.isCollat(), c.isForeign(), c.getKind(), c.getWojew(), pageable);
		else
			return repo.findSimpleByContains(c.getNameAsLowerCase(), c.isHist(), c.isCollat(), c.isForeign(), c.getKind(), c.getWojew(), pageable);
	}
	
}
