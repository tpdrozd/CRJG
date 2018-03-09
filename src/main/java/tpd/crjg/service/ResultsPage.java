package tpd.crjg.service;

import java.io.Serializable;
import java.util.List;

public class ResultsPage<E> implements Serializable {
	
	private static final long serialVersionUID = 1L;

	int		pagingSize;
	
	/** Numer tej strony, liczony od 1. */
	int		pageIndx;
	
	int		totalPages;
	
	long	firstItemIndx;
	
	long	lastItemIndx;
	
	int		itemsCount;
	
	long	totalItems;
	
	boolean	first;
	
	boolean	last;
	
	boolean	hasNext;
	
	boolean	hasPrev;
	
	List<E>	items;
	
	public int getPagingSize () {
		return pagingSize;
	}
	
	public int getPageIndx () {
		return pageIndx;
	}
	
	public int getTotalPages () {
		return totalPages;
	}
	
	public long getFirstItemIndx () {
		return firstItemIndx;
	}
	
	public long getLastItemIndx () {
		return lastItemIndx;
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
