<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>

<%@ taglib prefix="t" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="f" uri="http://www.springframework.org/tags/form" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<link href="<t:url value="/css/localitySearch.css"/>" type="text/css" rel="stylesheet" charset="UTF-8"/>
		<link href="<t:url value="/css/localitySearchResultPage.css"/>" type="text/css" rel="stylesheet" charset="UTF-8"/>

		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script>
		<script type="text/javascript" src="<t:url value="/ng/localitySearchApp.js"/>"></script>
		<script type="text/javascript" src="<t:url value="/ng/searchService.js"/>"></script>
		
		<title>CRJG - Wyszukiwanie w bazie miejscowości</title>
	</head>
	
	<body>
		<div class="container" ng-app="localitySearchApp" ng-controller="localitySearchCtrl">		
			<div class="leftcolumn">
				
				<!-- search criteria -->
				<table class="criteria">
					<tbody>
						<tr>
							<td colspan="5">
								<fieldset>
									<legend> Ignoruj: </legend>
									<table>
										<tr>
											<td>
												<input type="checkbox" ng-model="criteria.hist" ng-change="change()" ng-keydown="keydown($event)"></input>
												Nazwy historyczne
											</td>
											<td>
												<input type="checkbox" ng-model="criteria.foreign" ng-change="change()" ng-keydown="keydown($event)"></input>
												Nazwy w obcych językach
											</td>
										</tr>
										<tr>
											<td>
												<input type="checkbox" ng-model="criteria.collat" ng-change="change()" ng-keydown="keydown($event)"></input>
												Nazwy oboczne
											</td>
											<td>
												<input type="checkbox" ng-model="criteria.depend" ng-change="change()" ng-keydown="keydown($event)"></input>
												Miejscowości niesamodzielne
											</td>
										</tr>
									</table>
								</fieldset>
							</td>
						</tr>
							
						<tr>
							<td colspan="3" style="position: relative;">
								Początek nazwy: <br/>
								<input type="search" name="name" ng-model="criteria.name" ng-change="change()" ng-keydown="keydown($event)" autofocus/>
								
								<!-- list of hints -->
								<div class="locSearchList" style="top: 44px; left: 5px;" ng-show="showList">
									<div ng-show="showBar">
										<table>
											<tbody>
												<tr>
													<td>
														Pozycje: <span class="number">{{page.firstItemNumber}}</span> - <span class="number">{{page.lastItemNumber}}</span>
														z <span class="total">{{page.totalItems}}</span>
													</td>
													<td>
														Strona: <span class="page">{{page.pageNumber}}</span> z <span class="total">{{page.totalPages}}</span>
													</td>
													<td>
														<button title="Poprzednia strona - [PageUp]" ng-click="prevPage()">Poprzednia <b>&lt;&lt;</b></button>
														<button title="Następna strona - [PageDown]" ng-click="nextPage()"><b>&gt;&gt;</b> Następna</button>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
									<ul>
										<li ng-repeat="item in page.items" ng-class="item.ngClass">
											<span>{{item.name}}</span>
											<span class="typ" title="Typ miejscowości">{{item.type}}</span>
											<span class="parent" title="Miejscowość nadrzędna" ng-show="item.parentName.length > 0">{{item.parentName}}</span>
											<span class="other" title="Nazwy historyczne, oboczne, itp." ng-show="item.otherNames.length > 0">{{item.otherNames}}</span>
											<br/>
											<span class="gm" title="Gmina">{{item.gmina}}</span>
											<span class="pow" title="Powiat">{{item.powiat}}</span>
											<span class="woj" title="Województwo">{{item.wojewodztwo}}</span>
										</li>
									</ul>
								</div><!-- end of list of hints -->
							</td>

							<td colspan="2">
								Województwo: <br/>
								<f:select path="wojew" ng-model="criteria.wojew" ng-change="change()" ng-keydown="keydown($event)">
									<option label="Cała Polska" value=""/>
									<f:options items="${wojews}" />
								</f:select>
							</td>
						</tr>
					</tbody>
				</table>
				
				<!-- details of choosed locality -->
				<table class="details" >
					<tbody>
						<tr>
							<td colspan="4">
								<div>Nazwa:</div>
								<div>{{locality.name}}</div>
							</td>
							<td colspan="4">
								<div>Typ:</div>
								<div>
									<span>{{locality.type}}</span>
								</div>
							</td>
							<td colspan="4">
								<div>Miejsc. nadrz.:</div>
								<div>{{locality.parentName}}</div>
							</td>
						</tr>
						
						<tr>
							<td colspan="4">
								<div>Gmina:</div>
								<div>{{locality.gmina}}</div>
								<span style="min-height: 15px;">{{locality.gminaType}}</span>
							</td>
							<td colspan="4">
								<div>Powiat:</div>
								<div>{{locality.powiat}}</div>
							</td>
							<td colspan="4">
								<div>Województwo:</div>
								<div>{{locality.wojewodztwo}}</div>
							</td>
						</tr>	
						
						<tr> 
							<td colspan="6">
								<div>Nazwa historyczna:</div>
								<div>{{locality.historicalName}}</div>
								<span>{{locality.historicalNameNote}}</span>
							</td>
							<td colspan="6">
								<div>Nazwa oboczna:</div>
								<div>{{locality.collateralName}}</div>
								<span>{{locality.collateralNameNote}}</span>
							</td>
						</tr>
						
						<tr> 
							<td colspan="6">
								<div>Nazwa obca:</div>
								<div>{{locality.foreignName}}</div>
								<span>{{locality.foreignLatin}}</span>
							</td>
							<td colspan="6">
								<div>Język:</div>
								<div>{{locality.foreignLanguage}}</div>
								<span>{{locality.foreignLanguageCode}}</span>
							</td>
						</tr>
						
						<tr>
							<td colspan="12">
								<div>Uwagi:</div>
								<div>
									<span ng-show="locality.role.length > 0">
										{{locality.role}}
										<br/>
									</span>
									<span>{{locality.mainNote}}</span>
								</div>
							</td>
						</tr>
						
						<tr>
							<td colspan="6">
								<div>Dług. geogr.:</div>
								<div>{{locality.longitude}}</div>
								<span></span>
							</td>
							<td colspan="6">
								<div>Szer. geogr.:</div>
								<div>{{locality.latitude}}</div>
								<span></span>
							</td>
						</tr>
						
						<tr>
							<td colspan="3">
								<div>ID:</div>
								<div>{{locality.id}}</div>
							</td>
							<td colspan="3">
								<div>ID PRNG:</div>
								<div>{{locality.idPrng}}</div>
							</td>
							<td colspan="3">
								<div>ID TERYT:</div>
								<div>{{locality.idTeryt}}</div>
							</td>
							<td colspan="3">
								<div>ID JPTK:</div>
								<div>{{locality.idJptk}}</div>
							</td>
						</tr>
						
						<tr>
							<td colspan="12">
								<div>ID IIP:</div>
								<div>{{locality.idIip}}</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div><!-- end of left column -->
		</div>
	
	</body>
</html>