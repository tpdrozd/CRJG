package tpd.crjg.pagination;

import org.springframework.data.domain.Page;

class PageConverter {
	
	public static <E> SearchResultPage<E> convert ( Page<E> page ) {
		SearchResultPage<E> resultsPage = new SearchResultPage<E>();
		
		resultsPage.pagingSize = page.getSize();
		
		resultsPage.pageNumber = page.getNumber() + 1;
		resultsPage.totalPages = page.getTotalPages();
		
		resultsPage.itemsCount = page.getNumberOfElements();
		resultsPage.totalItems = page.getTotalElements();
		
		resultsPage.first = page.isFirst();
		resultsPage.last = page.isLast();
		resultsPage.hasNext = page.hasNext();
		resultsPage.hasPrev = page.hasPrevious();
		
		resultsPage.items = page.getContent();
		
		// obliczenie numeru pierwszego i ostatniego elementu na tej stronie.
		long sumOfItemsOnPrevPages = page.getNumber() * page.getSize(); // suma elementów (items) na poprzednich stronach
		
		resultsPage.firstItemNumber = sumOfItemsOnPrevPages + 1;
		resultsPage.lastItemNumber = sumOfItemsOnPrevPages + page.getNumberOfElements();
		
		return resultsPage;
	}
	
}
