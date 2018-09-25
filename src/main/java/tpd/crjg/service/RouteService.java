package tpd.crjg.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import tpd.crjg.repo.RouteRepo;

@Service
@SessionScope
public class RouteService {
	
	@Autowired
	private RouteRepo repo;
	
}
