package tpd.crjg.pagination;

import java.io.Serializable;
import java.util.List;

public class SearchResultPage<E> implements Serializable {
	
	private static final long	serialVersionUID	= 1L;
	
	int							pagingSize;
	
	/** Numer tej strony, liczony od 1. */
	int							pageNumber;
	
	int							totalPages;
	
	long						firstItemNumber;
	
	long						lastItemNumber;
	
	int							itemsCount;
	
	long						totalItems;
	
	boolean						first;
	
	boolean						last;
	
	boolean						hasNext;
	
	boolean						hasPrev;
	
	List<E>						items;
	
	public int getPagingSize () {
		return pagingSize;
	}
	
	public int getPageNumber () {
		return pageNumber;
	}
	
	public int getTotalPages () {
		return totalPages;
	}
	
	public long getFirstItemNumber () {
		return firstItemNumber;
	}
	
	public long getLastItemNumber () {
		return lastItemNumber;
	}
	
	public int getItemsCount () {
		return itemsCount;
	}
	
	public long getTotalItems () {
		return totalItems;
	}
	
	public boolean isFirst () {
		return first;
	}
	
	public boolean isLast () {
		return last;
	}
	
	public boolean isHasNext () {
		return hasNext;
	}
	
	public boolean isHasPrev () {
		return hasPrev;
	}
	
	public List<E> getItems () {
		return items;
	}
	
}
