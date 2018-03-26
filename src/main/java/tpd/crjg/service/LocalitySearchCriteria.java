package tpd.crjg.service;

import org.springframework.util.StringUtils;

import tpd.crjg.pagination.SearchCriteria;

public class LocalitySearchCriteria implements SearchCriteria<LocalitySearchCriteria> {
	
	private boolean	hist, collat, foreign, depend;
	
	private String	name;
	
	private String	wojew;
	
	public boolean isHist () {
		return hist;
	}
	
	public void setHist ( boolean hist ) {
		this.hist = hist;
	}
	
	public boolean isCollat () {
		return collat;
	}
	
	public void setCollat ( boolean collat ) {
		this.collat = collat;
	}
	
	public boolean isForeign () {
		return foreign;
	}
	
	public void setForeign ( boolean foreign ) {
		this.foreign = foreign;
	}
	
	public boolean isDepend () {
		return depend;
	}
	
	public void setDepend ( boolean depend ) {
		this.depend = depend;
	}
	
	public String getName () {
		return name;
	}
	
	public void setName ( String name ) {
		this.name = name;
	}
	
	public String getWojew () {
		return wojew;
	}
	
	public void setWojew ( String wojew ) {
		this.wojew = wojew;
	}
	
	@Override
	public boolean differentThen ( LocalitySearchCriteria that ) {
		boolean hasName = StringUtils.hasText(name);
		boolean hasWojew = StringUtils.hasText(wojew);
		
		if ( that == null )
			return hasName || hasWojew || hist || collat || foreign || depend;
		else
			return areDifferent(this.name, that.name)
				|| areDifferent(this.wojew, that.wojew)
				|| areDifferent(this.hist, that.hist)
				|| areDifferent(this.collat, that.collat)
				|| areDifferent(this.foreign, that.foreign)
				|| areDifferent(this.depend, that.depend);
	}
	
	private boolean areDifferent ( String s1, String s2 ) {
		boolean hasS1 = StringUtils.hasText(s1);
		boolean hasS2 = StringUtils.hasText(s2);
		
		if ( hasS1 && hasS2 )
			return !s1.equalsIgnoreCase(s2);
		else
			return hasS1 || hasS2;
	}
	
	private boolean areDifferent ( boolean b1, boolean b2 ) {
		return b1 ^ b2;
	}
	
	@Override
	public String toString () {
		return "name: " + name + ", wojew: " + wojew + ", hist: " + hist + ", collat: " + collat + ", foreign: " + foreign + ", depend: " + depend;
	}
	
}
