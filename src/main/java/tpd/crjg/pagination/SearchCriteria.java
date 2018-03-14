package tpd.crjg.pagination;

public interface SearchCriteria<C extends SearchCriteria<C>> {
	
	public boolean differentThen ( C that );
	
}
