package tpd.crjg;

import java.util.logging.Logger;

import org.neo4j.ogm.session.event.Event;
import org.neo4j.ogm.session.event.EventListenerAdapter;

import tpd.crjg.domain.Depot;
import tpd.crjg.domain.Town;

public class Listener extends EventListenerAdapter {
	
	private static final Logger log = Logger.getLogger(Listener.class.getName());
	
	@Override
	public void onPreSave ( Event event ) {
		Object object = event.getObject();
		
		if ( object instanceof Town ) {
			Town t = (Town) object;
			log.info("preSave Town  " + t.getName());
		}
		
		else if ( object instanceof Depot ) {
			Depot d = (Depot) object;
			log.info("preSave Depot " + d.getName());
		}
	}
	
	@Override
	public void onPostSave ( Event event ) {
		Object object = event.getObject();
		
		if ( object instanceof Town ) {
			Town t = (Town) object;
			log.info("postSave Town  " + t.getName());
		}
		
		else if ( object instanceof Depot ) {
			Depot d = (Depot) object;
			log.info("postSave Depot " + d.getName());
		}
	}
	
	@Override
	public void onPreDelete ( Event event ) {
		Object object = event.getObject();
		
		if ( object instanceof Town ) {
			Town t = (Town) object;
			log.info("preDelete Town " + t.getName());
		}
		
		else if ( object instanceof Depot ) {
			Depot d = (Depot) object;
			log.info("preDelete Depot " + d.getName());
		}
	}
	
	@Override
	public void onPostDelete ( Event event ) {
		Object object = event.getObject();
		
		if ( object instanceof Town ) {
			Town t = (Town) object;
			log.info("postDelete Town " + t.getName());
		}
		
		else if ( object instanceof Depot ) {
			Depot d = (Depot) object;
			log.info("postDelete Depot " + d.getName());
		}
	}
	
}
