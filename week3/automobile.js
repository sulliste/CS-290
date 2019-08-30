/*Author: Stephen Sullivan*/
/*Date: 4-23-19*/
/*Description: Sorts cars regarding their year, make, model and type using higher order functions*/

function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
}

var automobiles = [ 
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    ];
	
Automobile.prototype.logMe = function(typeBool){
		
		if(typeBool == true){
			console.log(this.year + " " + this.make + " " + this.model + " " + this.type);
		}
		else{
			console.log(this.year + " " + this.make + " " + this.model);
		}
	}
	
/*This function sorts arrays using an arbitrary comparator. You pass it a comparator and an array of objects appropriate for that comparator and it will return a new array which is sorted with the largest object in index 0 and the smallest in the last index*/
function sortArr( comparator, array ){
	
	var swap = false;
	
	do{
		swap = false;
		
		for(var i = 0; i<array.length-1; i++){
			
			if(comparator(array[i], array[i+1]) == false){
				
				var temp = array[i];
				array[i] = array[i+1];
				array[i+1] = temp;
				swap = true;
			}
		}
	}while(swap == true);
}

/*A comparator takes two arguments and uses some algorithm to compare them. If the first argument is larger or greater than the 2nd it returns true, otherwise it returns false. Here is an example that works on integers*/
function exComparator( int1, int2){
	
    if (int1 > int2){
        return true;
    } else {
        return false;
    }
}

/*For all comparators if cars are 'tied' according to the comparison rules then the order of those 'tied' cars is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator( auto1, auto2){
	
    if(auto1.year > auto2.year){
		return true;
	}
	else{
		return false;
	}
}

/*This compares two automobiles based on their make. It should be case insensitive and makes which are alphabetically earlier in the alphabet are "greater" than ones that come later (from A-Z).*/
function makeComparator( auto1, auto2){
	
	return exComparator(auto2.make.toLowerCase(), auto1.make.toLowerCase());
}

/*This compares two automobiles based on their type. The ordering from "greatest" to "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed). It should be case insensitive. If two cars are of equal type then the newest one by model year should be considered "greater".*/
function typeComparator( auto1, auto2){
    
	function rtnType(autoType){
		
		var flag = 5;
		
		if(autoType = "wagon"){
			flag = 4;
		}
		
		if(autoType = "suv"){
			flag = 3;
		}
		
		if(autoType = "pickup"){
			flag = 2;
		}
		
		if(autoType = "roadster"){
			flag = 1;
		}
		
		return flag;
	}
	
	if(auto1.type.toLowerCase() == auto2.type.toLowerCase()){
		return yearComparator(auto1, auto2);
	}
	
	var car1 = rtnType(auto1.type.toLowerCase());
	var car2 = rtnType(auto2.type.toLowerCase());
	
	//return exComparator(car1, car2);
	
	
	if(car1 > car2){
		return false;
	}
	else{
		return true;
	}
}

function printAuto(autoArray, bool){
	
	for(var i = 0; i<autoArray.length; i++){
		
		autoArray[i].logMe(bool);
	}
}

console.log("******");

console.log("The cars sorted by year are: ");
sortArr(yearComparator, automobiles);
printAuto(automobiles, false)

console.log("\n");

console.log("The cars sorted by make are: ");
sortArr(makeComparator, automobiles);
printAuto(automobiles, false)

console.log("\n");

console.log("The cars sorted by type are: ");
sortArr(typeComparator, automobiles);
printAuto(automobiles, true)

console.log("******");
