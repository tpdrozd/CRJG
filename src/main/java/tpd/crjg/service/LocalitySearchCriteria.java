package tpd.crjg.service;

import org.springframework.util.StringUtils;

import tpd.crjg.pagination.SearchCriteria;

public class LocalitySearchCriteria implements SearchCriteria<LocalitySearchCriteria> {
	
	private String name;
	
	public String getName () {
		return name;
	}
	
	public void setName ( String name ) {
		this.name = name;
	}
	
	@Override
	public boolean differentThen ( LocalitySearchCriteria that ) {
		boolean hasName = StringUtils.hasText(name);
		
		if ( that == null )
			return hasName;
		else {
			boolean hasThatName = StringUtils.hasText(that.name);
			
			if ( hasName && hasThatName )
				return !name.equalsIgnoreCase(that.name);
			else
				return hasName || hasThatName;
		}
	}
	
	@Override
	public String toString () {
		return "name: " + name;
	}
	
}
