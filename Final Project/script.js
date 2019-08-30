//Sticky headers for scrolling
//Reference W3Schools https://www.w3schools.com/howto/howto_js_sticky_header.asp

window.onscroll=function() {stickyFunc()};

var header = document.getElementById(myHeader);

var stick = header.offsetTop;

function stickyFunc(){
	if(window.pageYOffset > stick){
		header.classList.add("stick");
	}
	else{
		header.classList.remove("stick");
	}
}