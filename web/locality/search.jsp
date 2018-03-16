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
														Str.: <span class="page">{{page.pageNumber}}</span> z <span>{{page.totalPages}}</span>.
													</td>
													<td>
														<button title="Skrót klawiszowy - [PageUp]" ng-click="prevPage()">Poprzednia strona <b>&lt;&lt;</b></button>
														<button title="Skrót klawiszowy - [PageDown]" ng-click="nextPage()"><b>&gt;&gt;</b> Następna strona</button>
													</td>
													<td>
														Znaleziono <span class="total">{{page.totalItems}}</span> pozycji.
													</td>
												</tr>
											</tbody>
										</table>
									</div>
									<ul>
										<li ng-repeat="item in page.items">
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
								<div>Nazwa oboczna:</div>
								<div>{{locality.otherName}}</div>
								<span>{{locality.otherNameNote}}</span>
							</td>
							<td colspan="6">
								<div>Nazwa historyczna:</div>
								<div>{{locality.historicalName}}</div>
								<span>{{locality.historicalNameNote}}</span>
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
									<span>{{locality.note}}</span>
								</div>
							</td>
						</tr>
						
						<tr>
							<td colspan="6">
								<div>ID:</div>
								<div>{{locality.idAsStr}}</div>
							</td>
							<td colspan="6">
								<div>Dług. geogr.:</div>
								<div></div>
								<span>{{locality.geoLocation[0]}}</span>
							</td>
						</tr>
						
						<tr>
							<td colspan="3">
								<div>PRNG ID:</div>
								<div>{{locality.prngId}}</div>
							</td>
							<td colspan="3">
								<div>TERYT:</div>
								<div ng-show="locality.teryt > 0">{{locality.teryt}}</div>
							</td>
							<td colspan="6">
								<div>Szer. geogr.:</div>
								<div></div>
								<span>{{locality.geoLocation[1]}}</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div><!-- end of left column -->
		</div>
	
	</body>
</html>