package tpd.crjg.domain;

import java.util.List;

import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.Index;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;
import org.neo4j.ogm.annotation.typeconversion.Convert;

@NodeEntity
public class Town {
	
	@Id
	@GeneratedValue
	private Long		id;
	
	private String		name;
	
	/** Rodzaj miejscowości */
	private String		type;			//26 typów
	
	/** Nazwa miejscowości nadrzędnej, której częścią jest ta miejscowość */
	private String		parentName;
	
	private String		gmina;
	
	private String		gminaType;		//5 typów
	
	private String		powiat;
	
	@Index
	private String		wojewodztwo;
	
	/** Funkcja, jaką pełni miejscowość w strukturze administracyjnej */
	private String		role;
	
	private String		note;
	
	/** Nazwa historyczna, już nie obowiązująca */
	private String		historicalName;
	
	private String		historicalNote;
	
	/** Nazwa oboczna, używana obok nazwy podstawowej */
	private String		collateralName;
	
	private String		collateralNote;
	
	/** Nazwa w obcym języku */
	private String		foreignName;
	
	/** Latynizacja (zapis w alfabecie łacińskim) nazwy obcej, tylko jeśli język obcy nie używa alfabetu łacińskiego */
	private String		foreignLatin;
	
	/** Kod jezyka nazwy obcej */
	private String		foreignCode;
	
	/** Język nazwy obcej */
	private String		foreignLanguage;
	
	/** Szerokość geograficzna */
	private String		latitude;
	
	/** Długość geograficzna */
	private String		longitude;
	
	// @Index - tworzony w skrypcie, bo OGM nie tworzy poprawnie indexu
	@Convert (CoordConverter.class)
	private Coord		coord;
	
	/** Idetyfikator w Publicznym Rejestrze Nazw Geograficznych */
	private String		prng;
	
	private String		teryt;
	
	private String		iip;
	
	/** Identyfikator Jednostki Podziału Terytorialnego Kraju */
	private String		jptk;
	
	@Relationship (type = "HAS")
	private List<Depot>	depots;
	
	public Long getId () {
		return id;
	}
	
	public void setId ( Long id ) {
		this.id = id;
	}
	
	public String getName () {
		return name;
	}
	
	public void setName ( String name ) {
		this.name = name;
	}
	
	public String getType () {
		return type;
	}
	
	public void setType ( String type ) {
		this.type = type;
	}
	
	public String getParentName () {
		return parentName;
	}
	
	public void setParentName ( String parentName ) {
		this.parentName = parentName;
	}
	
	public String getGmina () {
		return gmina;
	}
	
	public void setGmina ( String gmina ) {
		this.gmina = gmina;
	}
	
	public String getGminaType () {
		return gminaType;
	}
	
	public void setGminaType ( String gminaType ) {
		this.gminaType = gminaType;
	}
	
	public String getPowiat () {
		return powiat;
	}
	
	public void setPowiat ( String powiat ) {
		this.powiat = powiat;
	}
	
	public String getWojewodztwo () {
		return wojewodztwo;
	}
	
	public void setWojewodztwo ( String wojewodztwo ) {
		this.wojewodztwo = wojewodztwo;
	}
	
	public String getRole () {
		return role;
	}
	
	public void setRole ( String role ) {
		this.role = role;
	}
	
	public String getNote () {
		return note;
	}
	
	public void setNote ( String note ) {
		this.note = note;
	}
	
	public String getHistoricalName () {
		return historicalName;
	}
	
	public void setHistoricalName ( String historicalName ) {
		this.historicalName = historicalName;
	}
	
	public String getHistoricalNote () {
		return historicalNote;
	}
	
	public void setHistoricalNote ( String historicalNote ) {
		this.historicalNote = historicalNote;
	}
	
	public String getCollateralName () {
		return collateralName;
	}
	
	public void setCollateralName ( String collateralName ) {
		this.collateralName = collateralName;
	}
	
	public String getCollateralNote () {
		return collateralNote;
	}
	
	public void setCollateralNote ( String collateralNote ) {
		this.collateralNote = collateralNote;
	}
	
	public String getForeignName () {
		return foreignName;
	}
	
	public void setForeignName ( String foreignName ) {
		this.foreignName = foreignName;
	}
	
	public String getForeignLatin () {
		return foreignLatin;
	}
	
	public void setForeignLatin ( String foreignLatin ) {
		this.foreignLatin = foreignLatin;
	}
	
	public String getForeignCode () {
		return foreignCode;
	}
	
	public void setForeignCode ( String foreignCode ) {
		this.foreignCode = foreignCode;
	}
	
	public String getForeignLanguage () {
		return foreignLanguage;
	}
	
	public void setForeignLanguage ( String foreignLanguage ) {
		this.foreignLanguage = foreignLanguage;
	}
	
	public String getLatitude () {
		return latitude;
	}
	
	public void setLatitude ( String latitude ) {
		this.latitude = latitude;
	}
	
	public String getLongitude () {
		return longitude;
	}
	
	public void setLongitude ( String longitude ) {
		this.longitude = longitude;
	}
	
	public Coord getCoord () {
		return coord;
	}
	
	public void setCoord ( Coord coord ) {
		this.coord = coord;
	}
	
	public String getPrng () {
		return prng;
	}
	
	public void setPrng ( String prng ) {
		this.prng = prng;
	}
	
	public String getTeryt () {
		return teryt;
	}
	
	public void setTeryt ( String teryt ) {
		this.teryt = teryt;
	}
	
	public String getIip () {
		return iip;
	}
	
	public void setIip ( String iip ) {
		this.iip = iip;
	}
	
	public String getJptk () {
		return jptk;
	}
	
	public void setJptk ( String jptk ) {
		this.jptk = jptk;
	}
	
	public List<Depot> getDepots () {
		return depots;
	}
	
	public void setDepots ( List<Depot> depots ) {
		this.depots = depots;
	}
	
}
