<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>

<%@ taglib prefix="t" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="f" uri="http://www.springframework.org/tags/form" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<link href="https://cdnjs.cloudflare.com/ajax/libs/angular-dragula/1.2.8/dragula.css" rel="stylesheet"/>
		
		<link href="<t:url value="/css/townSearch.css"/>" type="text/css" rel="stylesheet" charset="UTF-8"/>
		<link href="<t:url value="/css/hints.css"/>" type="text/css" rel="stylesheet" charset="UTF-8"/>
		<link href="<t:url value="/css/route.css"/>" type="text/css" rel="stylesheet" charset="UTF-8"/>
		<link href="<t:url value="/css/infoWindow.css"/>" type="text/css" rel="stylesheet" charset="UTF-8"/>

		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script>
		<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBo26SLCVE9QCiEZagBAB47907NjifNYMk&sensitive=false"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-dragula/1.2.8/angular-dragula.js"></script>
		
		<script type="text/javascript" src="<t:url value="/ng/routeApp.js"/>"></script>
		<script type="text/javascript" src="<t:url value="/ng/hints.js"/>"></script>
		<script type="text/javascript" src="<t:url value="/ng/hintService.js"/>"></script>
		<script type="text/javascript" src="<t:url value="/ng/gmap.js"/>"></script>
		<script type="text/javascript" src="<t:url value="/ng/depot.js"/>"></script>
		<script type="text/javascript" src="<t:url value="/ng/spatial.js"/>"></script>
		
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
								<input type="search" name="name" autofocus autocomplete="off" hints-criteria="name" hnt-auto-thrs="4" hnt-arrdw-thrs="3" hints-auto-trig hints-arrdw-trig hints-nav></input>
								
								<!-- list of hints -->
								<t:url value="/town/search" var="hintsSearchUrl"/>
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
				
				<!-- route -->
				<table class="route">
					<caption>Nowa trasa</caption>
					<thead>
						<tr>
							<th>Lp.</th>
							<th>
								Miejscowość / Przystanek
							</th>
							<th>Dystans</th>
							<th></th>
						</tr>
					</thead>
					
					<tbody dragula='"route"' dragula-model="stops" dragula-scope="$parent">
						<tr ng-repeat="stop in stops" class="stop" ng-mousedown="mousedown($event)" ng-mouseup="mouseup($event)">
							<td>{{$index}}</td>
							<td>
								<span>{{stop.town.name}}</span>
								<span class="type">{{stop.town.type}}</span> <span class="parent">{{stop.town.parentName}}</span>
								<br />
								<span ng-show="stop.hasDepot" class="depot">{{stop.depot.name}}</span>
							</td>
							<td>
								<span ng-show="stop.hasDistance()" class="distance" title="Odległość od poprzedniego przystanku (w lini prostej)">
									{{stop.distance()}}
								</span> <br/>
								<span ng-show="stop.hasDistance()" class="totalDistance" title="Odległość od pierwszego przystanku (suma odległości pomiedzy poprzednimi przystankami w lini prostej)">
									{{stop.totalDistance()}}
								</span>
							</td>
							<td>
								<!-- <span class="add" title="Dodaj przystanek" ng-click="addDepotTo(stop)">+</span> -->
								<span class="x" title="Usuń" ng-click="removeStop($index)">&#9587;</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div><!-- end of left column -->
			
			<div class="rightcolumn">
				<div class="gmap" lat="51.764" lng="19.463" zoom="6" click-callback="pointNewDepot(event.latLng)" rightclick-callback="spatialSearch(event.latLng)" cursor="{{gmapCursor}}">
					<!-- zaznaczane podpowiedzi (hinty) -->
					<marker icon="{{hint.parentName.length > 0 ? 'dot.yellow' : 'dot.green'}}" lat="{{hint.coord.lat}}" lng="{{hint.coord.lng}}" title="{{hint.name}}"></marker>

					<!-- wybrana miejscowość 
					<marker icon="{{town.parentName.length > 0 ? 'dot.yellow' : 'dot.green'}}" lat="{{town.coord.lat}}" lng="{{town.coord.lng}}" title="{{town.name}}" dblclick-callback="addStop()">
						<info-window visible="true">
							<div class="town">
								<span class="name">{{town.name}}</span> <span class="type">{{town.type}}</span> <span class="parent" ng-show="town.parentName.length > 0">{{town.parentName}}</span> <br/>
								<a ng-click="addStop()" title="Dodaje do trasy jako kolejny przystanek">Do trasy</a>
								<a ng-click="showDepots(town)" title="Wyświetla przystanki w tej miejscowości">Przystanki</a>
								<a ng-click="startAddDepot(town)" title="Tworzy nowy przystanek w tej miejscowości">Dodaj</a>
							</div>
						</info-window>
					</marker>
					-->
					
					<!-- wyszukane miejscowości -->
					<marker ng-repeat="town in towns" icon="{{town.parentName.length > 0 ? 'dot.yellow' : 'dot.green'}}" lat="{{town.coord.lat}}" lng="{{town.coord.lng}}" title="{{town.name}}">
						<info-window>
							<div class="town">
								<span class="name">{{town.name}}</span> <span class="type">{{town.type}}</span> <span class="parent" ng-show="town.parentName.length > 0">{{town.parentName}}</span> <br/>
								<a ng-click="addStop(town)" title="Dodaje do trasy jako kolejny przystanek">Do trasy</a>
								<a ng-click="showDepots(town)" title="Wyświetla przystanki w tej miejscowości">Przystanki</a>
								<a ng-click="startAddDepot(town)" title="Tworzy nowy przystanek w tej miejscowości">Dodaj</a>
							</div>
						</info-window>
					</marker>
					
					<!-- przystanki w wybranej miejscowości -->
					<marker ng-repeat="depot in depots" icon="{{town.parentName.length > 0 ? 'pure.yellow' : 'pure.green'}}" lat="{{depot.coord.lat}}" lng="{{depot.coord.lng}}" title="{{town.name}}, {{depot.name}}" dblclick-callback="addStop(depot)">
						<info-window>
							<div class="depot">
								<span class="town">{{town.name}}</span> <br/>
								<span class="name">{{depot.name}}</span> <br/>
								<a ng-click="addStop(town, depot)" title="Dodaje do trasy jako kolejny przystanek">Do trasy</a>
							</div>
						</info-window>
					</marker>

					<!-- dodawany przystanek (depot) -->
					<marker  icon="pure.grey" lat="{{newDepot.coord.lat}}" lng="{{newDepot.coord.lng}}" animation="drop" dragend-callback="dragNewDepot(event.latLng)">
						<info-window visible="true">
							<div class="depot">
								<span class="town">{{town.name}}</span> <br/>
								<input type="text" ng-model="newDepot.name" placeholder="Nazwa przystanku" class="name"></input> <br/>
								<a ng-click="confirmAddDepot()">Dodaj</a>
								<a ng-click="cancelAddDepot()" class="cancel">Anuluj</a>
							</div>
						</info-window>
					</marker> <!-- -->
					
					<!-- trasa (route) -->
 					<marker ng-repeat="stop in stops" icon="lbl.orange" lat="{{stop.coord().lat}}" lng="{{stop.coord().lng}}" label="{{$index}}" title="{{stop.title()}}">
						<info-window>
							<div class="stop">
		 						<span class="town">{{stop.town.name}}</span>
		 						<!--
		 						<span class="type">{{stop.town.type}}</span>
		 						<span class="parent" ng-show="stop.town.parentName.length > 0">{{stop.town.parentName}}</span> 
		 						-->	<br/>
								<span ng-show="stop.hasDepot" class="depot">{{stop.depot.name}}</span> <br ng-show="stop.hasDepot" />
								<a ng-click="removeStop($index)" class="remove">Usuń</a>
							</div>
						</info-window>
					</marker>
				</div>
			</div>
		</div>
	
	</body>
</html>
