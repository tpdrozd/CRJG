package tpd.crjg.cntrl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import tpd.crjg.repo.LocalityRepo;

@Controller
@RequestMapping ("/locality")
public class LocalityController {
	
	private static final String	WOJEWODZTWA	= "wojews";
	
	@Autowired
	private LocalityRepo		repo;
	
	@RequestMapping ("/search")
	public String search ( Model m ) {
		List<String> wojewodztwa = repo.extractWojewodztwa();
		m.addAttribute(WOJEWODZTWA, wojewodztwa);
		m.addAttribute("wojew", "");
		return "search.jsp";
	}
	
}
