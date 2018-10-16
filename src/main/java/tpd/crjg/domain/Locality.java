package tpd.crjg.domain;

import java.time.LocalDate;
import java.util.List;

import org.neo4j.ogm.annotation.CompositeIndex;
import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.Index;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Property;
import org.neo4j.ogm.annotation.Relationship;

@NodeEntity (label = "Locality")
@CompositeIndex ({"name", "wojewodztwo"})
public class Locality {
	
	@Id @GeneratedValue
	private Long		id;
	
	@Property (name = "idPrng")
	private String		idPrng;
	
	@Index
	@Property (name = "name")
	private String		name;
	
	@Index
	@Property (name = "_name")
	private String		_name;
	
	@Property (name = "nameStatus")
	private String		nameStatus;			//2 typy: urzędowa, niestandaryzowana
	
	@Property (name = "type")
	private String		type;				//26 typów
	
	@Property (name = "parentName")
	private String		parentName;
	
	@Property (name = "gmina")
	private String		gmina;
	
	@Property (name = "gminaType")
	private String		gminaType;			//5 typów
	
	@Property (name = "powiat")
	private String		powiat;
	
	@Index
	@Property (name = "wojewodztwo")
	private String		wojewodztwo;
	
	@Property (name = "role")
	private String		role;
	
	@Index
	@Property (name = "historicalName")
	private String		historicalName;
	
	@Index
	@Property (name = "_historicalName")
	private String		_historicalName;
	
	@Index
	@Property (name = "collateralName")
	private String		collateralName;
	
	@Index
	@Property (name = "_collateralName")
	private String		_collateralName;
	
	@Index
	@Property (name = "foreignName")
	private String		foreignName;
	
	@Index
	@Property (name = "_foreignName")
	private String		_foreignName;
	
	@Property (name = "foreignLanguageCode")
	private String		foreignLanguageCode;
	
	@Property (name = "foreignLanguage")
	private String		foreignLanguage;
	
	@Index
	@Property (name = "foreignLatin")
	private String		foreignLatin;
	
	@Index
	@Property (name = "_foreignLatin")
	private String		_foreignLatin;
	
	@Property (name = "mainNote")
	private String		mainNote;
	
	@Property (name = "historicalNote")
	private String		historicalNote;
	
	@Property (name = "collateralNote")
	private String		collateralNote;
	
	@Property (name = "idTeryt")
	private String		idTeryt;
	
	@Property (name = "idIip")
	private String		idIip;
	
	@Property (name = "idJptk")
	private String		idJptk;
	
	@Property (name = "longitude")
	private String		longitude;
	
	@Property (name = "lon")
	private Double		lon;
	
	@Property (name = "latitude")
	private String		latitude;
	
	@Property (name = "lat")
	private Double		lat;
	
	@Property (name = "introduceDate")
	private LocalDate	introduceDate;
	
	@Property (name = "modificationDate")
	private LocalDate	modificationDate;
	
	@Property (name = "cancelDate")
	private LocalDate	cancelDate;
	
	@Property (name = "diffElement")
	private String		diffElement;
	
	@Property (name = "typeElement")
	private String		typeElement;
	
	@Relationship (type = "HAS")
	private List<Depot>	depots;
	
	public Long getId () {
		return id;
	}
	
	public void setId ( Long id ) {
		this.id = id;
	}
	
	public String getIdPrng () {
		return idPrng;
	}
	
	public void setIdPrng ( String idPrng ) {
		this.idPrng = idPrng;
	}
	
	public String getName () {
		return name;
	}
	
	public void setName ( String name ) {
		this.name = name;
	}
	
	public String getNameStatus () {
		return nameStatus;
	}
	
	public void setNameStatus ( String nameStatus ) {
		this.nameStatus = nameStatus;
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
	
	public String getHistoricalName () {
		return historicalName;
	}
	
	public void setHistoricalName ( String historicalName ) {
		this.historicalName = historicalName;
	}
	
	public String getCollateralName () {
		return collateralName;
	}
	
	public void setCollateralName ( String collateralName ) {
		this.collateralName = collateralName;
	}
	
	public String getForeignName () {
		return foreignName;
	}
	
	public void setForeignName ( String foreignName ) {
		this.foreignName = foreignName;
	}
	
	public String getForeignLanguageCode () {
		return foreignLanguageCode;
	}
	
	public void setForeignLanguageCode ( String foreignLanguageCode ) {
		this.foreignLanguageCode = foreignLanguageCode;
	}
	
	public String getForeignLanguage () {
		return foreignLanguage;
	}
	
	public void setForeignLanguage ( String foreignLanguage ) {
		this.foreignLanguage = foreignLanguage;
	}
	
	public String getForeignLatin () {
		return foreignLatin;
	}
	
	public void setForeignLatin ( String foreignLatin ) {
		this.foreignLatin = foreignLatin;
	}
	
	public String getMainNote () {
		return mainNote;
	}
	
	public void setMainNote ( String mainNote ) {
		this.mainNote = mainNote;
	}
	
	public String getHistoricalNote () {
		return historicalNote;
	}
	
	public void setHistoricalNote ( String historicalNote ) {
		this.historicalNote = historicalNote;
	}
	
	public String getCollateralNote () {
		return collateralNote;
	}
	
	public void setCollateralNote ( String collateralNote ) {
		this.collateralNote = collateralNote;
	}
	
	public String getIdTeryt () {
		return idTeryt;
	}
	
	public void setIdTeryt ( String idTeryt ) {
		this.idTeryt = idTeryt;
	}
	
	public String getIdIip () {
		return idIip;
	}
	
	public void setIdIip ( String idIip ) {
		this.idIip = idIip;
	}
	
	public String getIdJptk () {
		return idJptk;
	}
	
	public void setIdJptk ( String idJptk ) {
		this.idJptk = idJptk;
	}
	
	public String getLongitude () {
		return longitude;
	}
	
	public void setLongitude ( String longitude ) {
		this.longitude = longitude;
	}
	
	public Double getLon () {
		return lon;
	}
	
	public void setLon ( Double lon ) {
		this.lon = lon;
	}
	
	public String getLatitude () {
		return latitude;
	}
	
	public void setLatitude ( String latitude ) {
		this.latitude = latitude;
	}
	
	public Double getLat () {
		return lat;
	}
	
	public void setLat ( Double lat ) {
		this.lat = lat;
	}
	
	public LocalDate getIntroduceDate () {
		return introduceDate;
	}
	
	public void setIntroduceDate ( LocalDate introduceDate ) {
		this.introduceDate = introduceDate;
	}
	
	public LocalDate getModificationDate () {
		return modificationDate;
	}
	
	public void setModificationDate ( LocalDate modificationDate ) {
		this.modificationDate = modificationDate;
	}
	
	public LocalDate getCancelDate () {
		return cancelDate;
	}
	
	public void setCancelDate ( LocalDate cancelDate ) {
		this.cancelDate = cancelDate;
	}
	
	public String getDiffElement () {
		return diffElement;
	}
	
	public void setDiffElement ( String diffElement ) {
		this.diffElement = diffElement;
	}
	
	public String getTypeElement () {
		return typeElement;
	}
	
	public void setTypeElement ( String typeElement ) {
		this.typeElement = typeElement;
	}

	public List<Depot> getDepots () {
		return depots;
	}

	public void setDepots ( List<Depot> depots ) {
		this.depots = depots;
	}
	
}
