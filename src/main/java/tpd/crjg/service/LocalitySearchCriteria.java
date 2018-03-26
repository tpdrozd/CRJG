package tpd.crjg.service;

import org.springframework.util.StringUtils;

import tpd.crjg.pagination.SearchCriteria;

public class LocalitySearchCriteria implements SearchCriteria<LocalitySearchCriteria> {
	
	private boolean		hist, collat, foreign;
	
	private Matching	matching;
	
	private Kind		kind;
	
	private String		name, wojew;
	
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
	
	public Matching getMatching () {
		return matching;
	}
	
	public void setMatching ( Matching matching ) {
		this.matching = matching;
	}
	
	public Kind getKind () {
		return kind;
	}
	
	public void setKind ( Kind kind ) {
		this.kind = kind;
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
	public String toString () {
		StringBuffer sb = new StringBuffer();
		sb
			.append("hist: ").append(hist)
			.append(", collat: ").append(collat)
			.append(", foreign: ").append(foreign)
			.append("\n")
			.append("matching: ").append(matching)
			.append(", kind: ").append(kind)
			.append("\n")
			.append("name: ").append(name)
			.append(", wojew: ").append(wojew);
		
		return sb.toString();
	}
	
	@Override
	public boolean differentThen ( LocalitySearchCriteria that ) {
		boolean hasMatching = matching != null;
		boolean hasKind = kind != null;
		boolean hasName = StringUtils.hasText(name);
		boolean hasWojew = StringUtils.hasText(wojew);
		
		if ( that == null )
			return hist || collat || foreign || hasMatching || hasKind || hasName || hasWojew;
		else
			return areDifferent(this.hist, that.hist)
				|| areDifferent(this.collat, that.collat)
				|| areDifferent(this.foreign, that.foreign)
				|| areDifferent(this.matching, that.matching)
				|| areDifferent(this.kind, that.kind)
				|| areDifferent(this.name, that.name)
				|| areDifferent(this.wojew, that.wojew);
	}
	
	private boolean areDifferent ( boolean b1, boolean b2 ) {
		return b1 ^ b2;
	}
	
	private <E extends Enum<E>> boolean areDifferent ( Enum<E> e1, Enum<E> e2 ) {
		boolean hasE1 = e1 != null;
		boolean hasE2 = e2 != null;
		
		if ( hasE1 && hasE2 )
			return !e1.equals(e2);
		else
			return hasE1 || hasE2;
	}
	
	private boolean areDifferent ( String s1, String s2 ) {
		boolean hasS1 = StringUtils.hasText(s1);
		boolean hasS2 = StringUtils.hasText(s2);
		
		if ( hasS1 && hasS2 )
			return !s1.equalsIgnoreCase(s2);
		else
			return hasS1 || hasS2;
	}
	
	public static enum Matching {
		START, END, EVERYWHERE;
	}
	
	public static enum Kind {
		STANDALONE, DEPENDENT, ALL;
	}
	
}
