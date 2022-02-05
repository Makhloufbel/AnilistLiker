var username = document.getElementsByClassName("links")[0].getElementsByClassName("link")[1].href;
var likes = document.querySelectorAll(".button:not(.liked)");

function eventFire(el, etype){
          if (el.fireEvent) {
            el.fireEvent('on' + etype);
          } else {
            var evObj = document.createEvent('Events');
            evObj.initEvent(etype, true, false);
            el.dispatchEvent(evObj);
  }
}

for(elt of likes){
	
    if (username != elt.closest('.wrap').getElementsByClassName("name")[0].href)
		{
			eventFire(elt, 'click');
		}
	}

