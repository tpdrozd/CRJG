<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="t" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>Centralny Rozkład Jazdy (graph) - CRJG</title>
	</head>

	<body>
		Hello World (graph).
		<br/>
		
		<t:url value="/town/search.mvc" var="townSearch"/>
		<a href="${townSearch}">Baza miejscowości - wyszukiwanie</a> <br/>
		
		<t:url value="/route/new.mvc" var="routeNew"/>
		<a href="${routeNew}">Trasa - tworzenie</a> <br/>
		
		<t:url value="/depot/edit.mvc" var="depotEdit"/>
		<a href="${depotEdit}">Przystanki - edycja</a> <br/>
	</body>
</html>