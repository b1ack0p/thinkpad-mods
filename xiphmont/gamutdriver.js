var gamutlink = document.getElementById('gamutlink');
var gamutscreen = document.getElementById('gamutscreen');

/* get all the screen menus */
var screenmenudiv = document.getElementById('screenmenus');
var screenmenus = screenmenudiv.getElementsByTagName("table");
var screennotes = document.getElementsByClassName("gamutcap");

var load_img;
var still_loading = false;

function image_loaded(element){
    if(element === load_img){
	var gamutimage = document.getElementById('gamutimage');
	still_loading = false;
	gamutimage.style.opacity="1";
	gamutimage.src = load_img.src;
	gamutlink.href = load_img.src;
	load_img == null;
    }
}

function set_image(element){
    var backlights = element.getElementsByTagName("input");
    var n = backlights.length;
    while(n--) {
	var val = backlights[n].value;
	var checked = backlights[n].checked;
	if(checked){
	    var gamutimage = document.getElementById('gamutimage');
	    gamutimage.style.backgroundImage="url(\'"+gamutimage.src+"\')";
	    gamutimage.style.backgroundSize="contain";
	    still_loading = true;
	    window.setTimeout(function(){
		/* veil the image if some time has gome past */
		if(still_loading){
		    gamutimage.style.opacity=".25";
		}
	    }, 200);
            load_img = gamutimage.cloneNode(gamutimage);
            load_img.onload = function() { 
		image_loaded(load_img); 
            }
            load_img.src = "gamutdata/"+element.id+"-"+val+".png";
	}
    }
}

function set_screen(){
    var screenname = gamutscreen.options[gamutscreen.selectedIndex].getAttribute("value");

    /* hide all menus except selected one */
    var n = screenmenus.length;
    while(n--) {
	var menuname = screenmenus[n].id;
	if(menuname == screenname){
	    screenmenus[n].style.visibility="visible";
	    /* set selected image */
	    set_image(screenmenus[n]);
	}else{
	    screenmenus[n].style.visibility="hidden";
	}
    }

    /* hide all notes except selected one */
    n = screennotes.length;
    while(n--) {
	var notename = screennotes[n].id;
	if(notename == screenname+"notes"){
	    screennotes[n].style.display="block";
	}else{
	    screennotes[n].style.display="none";
	}
    }


}

gamutscreen.onchange = function(){set_screen();};

var allinputs = document.getElementsByTagName("input");
var alln = allinputs.length;
while(alln--) {
    allinputs[alln].onclick = function(){set_screen();};
}
set_screen();
