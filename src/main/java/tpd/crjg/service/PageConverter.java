package tpd.crjg.service;

import org.springframework.data.domain.Page;

public class PageConverter {
	
	public static <E> ResultsPage<E> convert ( Page<E> page ) {
		ResultsPage<E> resultsPage = new ResultsPage<E>();
		
		resultsPage.pagingSize = page.getSize();
		
		resultsPage.pageIndx = page.getNumber() + 1;
		resultsPage.totalPages = page.getTotalPages();
		
		resultsPage.itemsCount = page.getNumberOfElements();
		resultsPage.totalItems = page.getTotalElements();
		
		resultsPage.first = page.isFirst();
		resultsPage.last = page.isLast();
		resultsPage.hasNext = page.hasNext();
		resultsPage.hasPrev = page.hasPrevious();
		
		resultsPage.items = page.getContent();
		
		// obliczenie numeru (indx) pierwszego i ostatniego elementu na tej stronie.
		long sumOfItemsOnPrevPages = page.getNumber() * page.getSize(); // suma elementów (items) na poprzednich stronach
		
		resultsPage.firstItemIndx = sumOfItemsOnPrevPages + 1;
		resultsPage.lastItemIndx = sumOfItemsOnPrevPages + page.getNumberOfElements();
		
		return resultsPage;
	}
	
}
