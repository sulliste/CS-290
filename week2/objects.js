/*Author: Stephen Sullivan
  Date: 4/18/19
  Description: Examples of JS objects and checking values*/
  
function deepEqual(objA, objB){
	
	//tests positive for objects, negative for null
	if((typeof(objA) == "object") && (typeof(objB) == "object") && (objA != null) && (objB != null)){
		
		var sizeOfA = 0; // number of objects in A
		var sizeOfB = 0; //number of objects in B
		var namesA = object.keys(objA); //property names in A
		var namesB = object.keys(objB); //property names in B
		
		for(var aProps in objA){ //increments size for each property
			sizeOfA++;
		}
		
		for(var bProps in objB){ //increments size for each property
			sizeOfB++;
		}
		
		if(sizeOfA != sizeOfB){
			return false;
		}
		
		for(var i = 0; i<sizeOfA; i++){ //loops through prop names, returns true if match, false if not
			if(namesA[i] != namesB[i]){
				return false;
			}
		}
		
		for(var propA in objA){ //prop comparison loop
			if(deepEqual(objA[propA], objA[propA]) == false){ //recursive call to deepEqual
				return false;
			}
		}
		
		return true; //if all tests pass
	}
	
	//returns result if params are neither both null, nor objects
	else{
		return objA === objB;
	}
}

var objC = {you: {want: {these: "nests"}}, yes: "please"};

console.log("Null is not Object", deepEqual({This: "That"}, null));
console.log("Raw Value Comparison", deepEqual("A","A"));
console.log("Deep Nesting", deepEqual({you: {want: {these: "nests"}}, yes: "please"}, objC));
console.log("Array Comparison", deepEqual(["Make", ["a"]], ["new", ["phrase"]]));