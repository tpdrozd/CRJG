package tpd.crjg.pagination;

public class SearchRequest<C extends SearchCriteria<C>> {
	
	private int	pagingSize;
	
	private C	criteria;
	
	public int getPagingSize () {
		return pagingSize;
	}
	
	public void setPagingSize ( int pagingSize ) {
		this.pagingSize = pagingSize;
	}
	
	public C getCriteria () {
		return criteria;
	}
	
	public void setCriteria ( C criteria ) {
		this.criteria = criteria;
	}
	
	public String toString() {
		StringBuffer sb = new StringBuffer();
		sb
			.append("pagingSize: ").append(pagingSize)
			.append(", criteria: \n").append(criteria.toString());
		
		return sb.toString();
	}
	
}
