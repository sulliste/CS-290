/*Author: Stephen Sullivan
  Date: 4/18/19
  Description: Examples of function hoisting */

//function hoist works
thing();

function thing(i){
	i = "A thing";
	console.log(i);
}


//function hoist doesn't work
console.log(diffThing());

var diffThing = function(){
	return "A different thing";
}

//this works
console.log(diffThing());
