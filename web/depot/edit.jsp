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
		<link href="<t:url value="/css/depots.css"/>" type="text/css" rel="stylesheet" charset="UTF-8"/>
		<link href="<t:url value="/css/infoWindow.css"/>" type="text/css" rel="stylesheet" charset="UTF-8"/>

		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script>
		<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBo26SLCVE9QCiEZagBAB47907NjifNYMk&sensitive=false"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-dragula/1.2.8/angular-dragula.js"></script>
		
		<script type="text/javascript" src="<t:url value="/ng/depotApp.js"/>"></script>
		<script type="text/javascript" src="<t:url value="/ng/depot.js"/>"></script>
		<script type="text/javascript" src="<t:url value="/ng/hints.js"/>"></script>
		<script type="text/javascript" src="<t:url value="/ng/hintService.js"/>"></script>
		<script type="text/javascript" src="<t:url value="/ng/gmap.js"/>"></script>
		
		<title>CRJG - nowa trasa</title>
	</head>
	
	<body>
		<div class="container" ng-app="depotApp" ng-controller="depotCtrl">		
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
				
				<table class="details" >
					<tbody>
						<tr>
							<td colspan="4">
								<div>Nazwa:</div>
								<div>{{town.name}}</div>
							</td>
							<td colspan="4">
								<div>Typ:</div>
								<div>
									<span>{{town.type}}</span>
								</div>
							</td>
							<td colspan="4">
								<div>Miejsc. nadrz.:</div>
								<div>{{town.parentName}}</div>
							</td>
						</tr>
						
						<tr>
							<td colspan="4">
								<div>Gmina:</div>
								<div>{{town.gmina}}</div>
								<span style="min-height: 15px;">{{town.gminaType}}</span>
							</td>
							<td colspan="4">
								<div>Powiat:</div>
								<div>{{town.powiat}}</div>
							</td>
							<td colspan="4">
								<div>Województwo:</div>
								<div>{{town.wojewodztwo}}</div>
							</td>
						</tr>	
					</tbody>
				</table>
				
<%-- 					<thead>
						<tr>
							<th>Lp.</th>
							<th>
								Miejscowość / Przystanek
							</th>
							<th>Dystans</th>
							<th></th>
						</tr>
					</thead> --%>
				
				<table class="depots">
					<thead>
						<tr>
							<th>Lp.</th>
							<th>Nazwa</th>
							<th>Współrzędne</th>
							<th colspan="2">Akcje</th>
						</tr>
					</thead>
					
					<tbody>
						<tr ng-hide="isInAddMode()">
							<td>0</td>
							<td></td>
							<td colspan="3">
								<button ng-click="startAdd()">Dodaj nowy przystanek</button>
							</td>
						</tr>
						
						<tr ng-show="isInAddMode()" class="newDepot">
							<td>0</td>
							<td>
								<input type="text" placeholder="Nazwa nowego przystanku" ng-model="newDepot.name"></input>
							</td>
							<td>
								{{newDepot.latitude}}
								{{newDepot.longitude}}
							</td>
							<td>
								<button ng-click="confirmAdd()">Dodaj</button>
							</td>
							<td>
								<button ng-click="cancelAdd()">Anuluj</button>
							</td>
						</tr>
						
						<tr ng-repeat="depot in depots" class="depot" ng-mouseover="startAnimation(depot)" ng-mouseleave="stopAnimation(depot)">
							<!-- liczba porządkowa -->
							<td>
								{{$index + 1}}
							</td>
						
							<!-- nazwa -->
							<td>
								<div ng-show="isInReadMode(depot) || isInRemoveMode(depot)">
									{{depot.name}}
								</div>
								
								<div ng-show="isInEditMode(depot)">
									<input type="text" ng-model="model.name"></input>
								</div>
							</td>
	
							<!-- współrzędne -->
							<td>
								<div ng-show="isInReadMode(depot)">
									{{depot.latitude}}
									{{depot.longitude}}
								</div>
								
								<div ng-show="isInEditMode(depot)">
									{{model.latitude}}
									{{model.longitude}}
								</div>
								
								<div ng-show="isInRemoveMode(depot)" style="color: red;">
									Usunąć?
								</div>
							</td>
							
							<!-- akcja 1 (przycisk Edit/Confirm) -->
							<td>
								<div ng-show="isInReadMode(depot)">
									<button ng-click="startEdit(depot)">Edytuj</button>
								</div>

								<div ng-show="isInEditMode(depot)">
									<button ng-click="confirmEdit()">Zapisz</button>
								</div>

								<div ng-show="isInRemoveMode(depot)">
									<button ng-click="confirmRemove()">Potwierdź</button>
								</div>
							</td>
							
							<!-- akcja 2 (przycisk Remove/Cancel) -->
							<td>
								<div ng-show="isInReadMode(depot)">
									<button ng-click="startRemove(depot)">Usuń</button>
								</div>

								<div ng-show="isInEditMode(depot)">
									<button ng-click="cancelEdit()">Anuluj</button>
								</div>

								<div ng-show="isInRemoveMode(depot)">
									<button ng-click="cancelRemove()">Anuluj</button>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div><!-- end of left column -->
			
			<div class="rightcolumn">
				<div class="gmap" lat="51.764" lng="19.463" zoom="6" click-callback="pointNewDepot(event.latLng)" cursor="{{gmapCursor}}">
					<!-- zaznaczane podpowiedzi (hinty) -->
					<marker icon="dot.red" lat="{{hint.coord.lat}}" lng="{{hint.coord.lng}}" title="{{hint.name}}"></marker>

					<!-- wybrana miejscowość -->
					<marker lat="{{town.coord.lat}}" lng="{{town.coord.lng}}" title="{{town.name}}">
						<info-window visible="true">
							<div class="town">
								<span class="name">{{town.name}}</span> <span class="type">{{town.type}}</span> <span class="parent" ng-show="town.parentName.length > 0">{{town.parentName}}</span> <br/>
								<!-- <a ng-click="" title="Wyświetla przystanki w tej miejscowości">Przystanki</a> -->
								<a ng-click="startAdd()" title="Tworzy nowy przystanek w tej miejscowości">Dodaj</a>
							</div>
						</info-window>
					</marker>
					
					<!-- przystanki w wybranej miejscowości -->
					<marker ng-repeat="depot in depots" icon="pure.red" lat="{{depot.coord.lat}}" lng="{{depot.coord.lng}}" title="{{town.name}}, {{depot.name}}" animation="{{getAnimation(depot)}}" dragend-callback="dragDepot(event.latLng)" draggable="{{isInEditMode(depot)}}">
						<info-window>
							<div ng-show="isInReadMode(depot)" class="depot">
								<span class="town">{{town.name}}</span>	<br/>
								<span class="name">{{depot.name}}</span> <br/>
								<a ng-click="startEdit(depot)" title="Pozwala zmienić nazwę i położenie przystanku">Edytuj</a>
								<a ng-click="startRemove(depot)" title="Pozwala usunąć przystanek z bazy danych" class="remove">Usuń</a>
							</div>
							
							<div ng-show="isInEditMode(depot)" class="depot">
								<span class="town">{{town.name}}</span>	<br/>
								<input type="text" ng-model="model.name" class="name"></input> <br/>
								<a ng-click="confirmEdit()">Zapisz</a>
								<a ng-click="cancelEdit()" class="cancel">Anuluj</a>
							</div>
							
							<div ng-show="isInRemoveMode(depot)" class="depot">
								<span class="remove">Usunąć:</span>	<br/>
								<span class="name">{{depot.name}}</span><span class="remove">?</span> <br/>
								<a ng-click="confirmRemove()" class="remove">Tak</a>
								<a ng-click="cancelRemove()" class="cancel">Nie</a>
							</div>
						</info-window>
					</marker>

					<!-- dodawany przystanek (depot) -->
					<marker icon="pure.orange" lat="{{newDepot.coord.lat}}" lng="{{newDepot.coord.lng}}" animation="drop" dragend-callback="dragNewDepot(event.latLng)">
						<info-window visible="true">
							<div class="depot">
								<span class="town">{{town.name}}</span>	<br/>
								<input type="text" ng-model="newDepot.name" placeholder="Nazwa przystanku" class="name"></input><br/>
								<a ng-click="confirmAdd()">Dodaj</a>
								<a ng-click="cancelAdd()" class="cancel">Anuluj</a>
							</div>
						</info-window>
					</marker> <!-- -->
				</div>
			</div>
		</div>
	
	</body>
</html>
