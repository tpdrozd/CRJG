package tpd.crjg.cntrl;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping ("/route")
public class RouteController {
	
	@RequestMapping ("/new")
	public String newx (Model m) {
		m.addAttribute("wojew", "");
		return "/route/new.jsp";
	}
	
}
