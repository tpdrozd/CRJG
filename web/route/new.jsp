<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>

<%@ taglib prefix="t" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="f" uri="http://www.springframework.org/tags/form" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<link href="https://cdnjs.cloudflare.com/ajax/libs/angular-dragula/1.2.8/dragula.css" rel="stylesheet"/>
		
		<link href="<t:url value="/css/localitySearch.css"/>" type="text/css" rel="stylesheet" charset="UTF-8"/>
		<link href="<t:url value="/css/hints.css"/>" type="text/css" rel="stylesheet" charset="UTF-8"/>
		<link href="<t:url value="/css/route.css"/>" type="text/css" rel="stylesheet" charset="UTF-8"/>
		<!-- <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"/> -->

		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script>
		<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBo26SLCVE9QCiEZagBAB47907NjifNYMk&sensitive=false"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-dragula/1.2.8/angular-dragula.js"></script>
		
		<script type="text/javascript" src="<t:url value="/ng/routeApp.js"/>"></script>
		<script type="text/javascript" src="<t:url value="/ng/hints.js"/>"></script>
		<script type="text/javascript" src="<t:url value="/ng/hintService.js"/>"></script>
		<script type="text/javascript" src="<t:url value="/ng/gmap.js"/>"></script>
		
		<title>CRJG - nowa trasa</title>
	</head>
	
	<body>
		<div class="container" ng-app="routeApp" ng-controller="routeCtrl">		
			<div class="leftcolumn">
				
				<!-- search criteria -->
				<table class="criteria">
					<tbody>
						<tr>
							<td colspan="5">
								<fieldset>
									<legend> Ignoruj nazwy: </legend>
									<table>
										<tr>
											<td>
												<input type="checkbox" hints-criteria="hist" hints-auto-trig></input>
												Historyczne
											</td>
										</tr>
										<tr>
											<td>
												<input type="checkbox" hints-criteria="collat" hints-auto-trig></input>
												Oboczne
											</td>
										</tr>
										<tr>
											<td title="Nazwy w językach obcych">
												<input type="checkbox" hints-criteria="foreign" hints-auto-trig></input>
												Obce
											</td>
										</tr>
									</table>
								</fieldset>
							</td>
							
							<td colspan="5">
								<fieldset>
									<legend> Dopasuj do: </legend>
									<table>
										<tr>
											<td>
												<input type="radio" name="matching" value="START" checked="checked" hints-criteria="matching" hints-auto-trig></input>
												Początku nazwy
											</td>
										</tr>
										<tr>
											<td title="Także w środku nazwy">
												<input type="radio" name="matching" value="EVERYWHERE" hints-criteria="matching" hints-auto-trig></input>
												Gdzie kolwiek
											</td>
										</tr>
										<tr>
											<td>
												<input type="radio" name="matching" value="END" hints-criteria="matching" hints-auto-trig></input>
												Końca nazwy
											</td>
										</tr>
									</table>
								</fieldset>
							</td>
							
							<td colspan="5">
								<fieldset>
									<legend> Tylko miejscowości: </legend>
									<table>
										<tr>
											<td>
												<input type="radio" name="kind" value="ALL" checked="checked" hints-criteria="kind" hints-auto-trig></input>
												Wszystkie
											</td>
										</tr>
										<tr>
											<td>
												<input type="radio" name="kind" value="STANDALONE" hints-criteria="kind" hints-auto-trig></input>
												Samodzielne
											</td>
										</tr>
										<tr>
											<td title="Będące częścią innych miejscowości">
												<input type="radio" name="kind" value="DEPENDENT" hints-criteria="kind" hints-auto-trig></input>
												Niesamodzielne
											</td>
										</tr>
									</table>
								</fieldset>
							</td>
						</tr>
							
						<tr>
							<td colspan="9" style="position: relative;">
								Fragment nazwy: <br/>
								<%-- <input type="search" name="name" autofocus hints-criteria="name" hints-auto-trig="4" hints-arrdw-trig="3" hints-nav></input> --%>
								<input type="search" name="name" autofocus hints-criteria="name" hnt-auto-thrs="4" hnt-arrdw-thrs="3" hints-auto-trig hints-arrdw-trig hints-nav></input>
								
								<!-- list of hints -->
								<t:url value="/locality/search" var="hintsSearchUrl"/>
								<div hints="${hintsSearchUrl}" class="hints" style="top: 44px; left: 5px;">
									<li hint-item>
										<span>{{hint.name}}</span>
										<span class="typ" title="Typ miejscowości">{{hint.type}}</span>
										<span class="parent" title="Miejscowość nadrzędna" ng-show="hint.parentName.length > 0">{{hint.parentName}}</span>
										<span class="other" title="Nazwy historyczne, oboczne, itp." ng-show="hint.otherNames.length > 0">{{hint.otherNames}}</span>
										<br/>
										<span class="gm" title="Gmina">{{hint.gmina}}</span>
										<span class="pow" title="Powiat">{{hint.powiat}}</span>
										<span class="woj" title="Województwo">{{hint.wojewodztwo}}</span>
									</li>
								</div><!-- end of list of hints -->
							</td>

							<td colspan="6">
								Województwo: <br/>
								<f:select path="wojew" hints-criteria="wojew" hints-auto-trig="x">
									<option label="Cała Polska" value="" />
									<f:options items="${wojews}" />
								</f:select>
							</td>
						</tr>
					</tbody>
				</table>
				
				<!-- details of choosed locality -->
				<table class="details" style="display: none;">
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
								<span>{{locality.historicalNote}}</span>
							</td>
							<td colspan="6">
								<div>Nazwa oboczna:</div>
								<div>{{locality.collateralName}}</div>
								<span>{{locality.collateralNote}}</span>
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
					</tbody>
				</table>
				
				<!-- route -->
				<ol class="route" dragula='"route"' dragula-model="stops" dragula-scope="$parent">
					<li ng-repeat="stop in stops" class="stop">
						<span class="lp">{{$index}}</span>
						<span class="x" title="Usuń" ng-click="remove($index)">&#9587;</span>
						<span class="add" title="Dodaj przystanek" ng-click="addDepotTo(stop)">+</span>
						
						<span>{{stop.name}}</span> <span class="type">{{stop.type}}</span> <span class="parent">{{stop.parentName}}</span> <br/>
						<span class="depot">Przystanek PKS</span>
					</li>
				</ol>
			</div><!-- end of left column -->
			
			<div class="rightcolumn">
				<div class="gmap" lat="51.764" lng="19.463" zoom="6" click-callback="markNewDepot(event.latLng)" cursor="{{gmapCursor}}">
					<!-- zaznaczane podpowiedzi (hinty) -->
					<marker lat="{{hint.lat}}" lng="{{hint.lng}}" title="{{hint.name}}"></marker>

					<!-- trasa (route) -->
 					<marker ng-repeat="stop in stops" icon="orange" lat="{{stop.lat}}" lng="{{stop.lon}}" label="{{$index}}" title="{{stop.name}}">
						<info-window>
	 						<b>{{stop.name}}</b><br/>
							<i>{{stop.type}}</i> {{stop.parentName}}
						</info-window>
					</marker>
					
					<!-- przystanek (depot) -->
					<marker  icon="greenDark" lat="{{depot.lat}}" lng="{{depot.lng}}" dragend-callback="markNewDepot(event.latLng)">
						<info-window visible="true">
							<form ng-submit="saveDepot()">
								Nazwa przystanku: <br/>
								<input type="text" ng-model="depot.name"></input><br/>
								<input type="button" value="Anuluj" ng-click="cancelDepot()" />
								<input type="submit" value="Zapisz"/>
							</form>
						</info-window>
					</marker>
				</div>
			</div>
		</div>
	
	</body>
</html>
