/*Author: Stephen Sullivan*/
/*Date: 4-30-2019*/

//Function to create table constructor
function tableCon(){
	
	var doc = document.body;
	var table = document.createElement('table');
	var tabBody = document.createElement('tbody');
	var tabRow = document.createElement('tr');
	
	for (var i = 0; i < 4; i++){ //loop creates header row
		
		var hCell = document.createElement('th');
		var hText = document.createTextNode("Header " +(i + 1));
		
		hCell.appendChild(hText); //appends text node to cell
		tabRow.appendChild(hCell); //appends cell to table row
	}
	
	tabBody.appendChild(tabRow); //appends header row to table body
	
	for (var i = 0; i < 3; i++){ // loop creates additional rows below header
		
		var newRow = document.createElement('tr');
		
		for (var j = 0; j < 4; j++){
			
			var newCell = document.createElement('td');
			var cellText = document.createTextNode((i+1) + ', ' + (j+1));
			var cellTextID = (i+1) + ', ' + (j+1);
			
			newCell.setAttribute('id', cellTextID); //set ID for attribute
			newCell.appendChild(cellText); //appends text node to cell
			newRow.appendChild(newCell); //appends cell to table row
		}
		
		tabBody.appendChild(newRow); //appends row to body of table
	}
	
	table.appendChild(tabBody); //appends body to table
	doc.appendChild(table); //appends table to document
	table.setAttribute("border", "2px"); //sets border attribute to 2px
}

//Function to create button elements 
function newButtons(){
	
	//variables for button elements
	var cellUp = document.createElement("button");
	var cellDn = document.createElement("button");
	var cellRt = document.createElement("button");
	var cellLt = document.createElement("button");
	var cellMark = document.createElement("button");
	
	//assign element IDs
	cellUp.id = "moveUp";
	cellDn.id = "moveDn";
	cellRt.id = "moveRt";
	cellLt.id = "moveLt";
	cellMark.id = "markCell";
	
	//variables for text nodes
	var cellUpTxt = document.createTextNode("Up");
	var cellDnTxt = document.createTextNode("Down");
	var cellRtTxt = document.createTextNode("Left");
	var cellLtTxt = document.createTextNode("Right");
	var cellMkTxt = document.createTextNode("Mark");
	
	//appending text nodes
	cellUp.appendChild(cellUpTxt);
	cellDn.appendChild(cellDnTxt);
	cellRt.appendChild(cellRtTxt);
	cellLt.appendChild(cellLtTxt);
	cellMark.appendChild(cellMkTxt);
	
	//button elements appended to document
	document.body.appendChild(cellUp);
	document.body.appendChild(cellDn);
	document.body.appendChild(cellRt);
	document.body.appendChild(cellLt);
	document.body.appendChild(cellMark);
}


var curRow = 1; //current row variable
var curCol = 1; //current column variable

//Edge checking function, takes directions as params
function edge(direct){
	
	if(direct == "up"){
		if(curRow == 0){
			return false;
		}
		else{
			return true;
		}
	}
	
	if(direct == "down"){
		if(curRow == 5){
			return false;
		}
		else{
			return true;
		}
	}
	
	if(direct == "right"){
		if(curCol == 4){
			return false;
		}
		else{
			return true;
		}
	}
	
	if(direct == "left"){
		if(curCol == 0){
			return false;
		}
		else{
			return true;
		}
	}
}

//Function to move cell up
function cellUp(){
	
	var locate = document.getElementById(curCol + ", " + curRow);
	
	if(edge("up") == false){ //if location is too far, return false
		return;
	}
	else{ //if within bounds of table, change border of new and prev locations
		locate.style.borderWidth = "1px";
		curCol -= 1; //iterate up
		
		var newLocate = document.getElementById(curCol + ", " + curRow);
		newLocate.style.borderWidth = "4px";
	}
}

//Function to move cell down
function cellDn(){
	
	var locate = document.getElementById(curCol + ", " + curRow);
	
	if(edge("down") == false){ //if location is too far, return false
		return;
	}
	else{ //if within bounds of table, change border of new and prev locations
		locate.style.borderWidth = "1px";
		curCol += 1; //iterate down
		
		var newLocate = document.getElementById(curCol + ", " + curRow);
		newLocate.style.borderWidth = "4px";
	}
}

//Function to move cell right
function cellRt(){
	
	var locate = document.getElementById(curCol + ", " + curRow);
	
	if(edge("right") == false){ //if location is too far, return false
		return;
	}
	else{ //if within bounds of table, change border of new and prev locations
		locate.style.borderWidth = "1px";
		curRow -= 1; //iterate right
		
		var newLocate = document.getElementById(curCol + ", " + curRow);
		newLocate.style.borderWidth = "4px";
	}
}

//Function to move cell left
function cellLt(){
	
	var locate = document.getElementById(curCol + ", " + curRow);
	
	if(edge("left") == false){ //if location is too far, return false
		return;
	}
	else{ //if within bounds of table, change border of new and prev locations
		locate.style.borderWidth = "1px";
		curRow += 1; //iterate left
		
		var newLocate = document.getElementById(curCol + ", " + curRow);
		newLocate.style.borderWidth = "4px";
	}
}

//Function to change background color of selected cell
function cellMark(){
	
	var locate = document.getElementById(curCol + ", " + curRow);
	locate.style.backgroundColor = "yellow";
}

//Constructors called
tableCon();
newButtons();

//Set up a new cell
var startLoc = document.getElementById("1, 1");
startLoc.style.borderWidth = "4px";

//Initialize buttons
document.getElementById("moveUp").addEventListener("click", cellUp);
document.getElementById("moveDn").addEventListener("click", cellDn);
document.getElementById("moveRt").addEventListener("click", cellRt);
document.getElementById("moveLt").addEventListener("click", cellLt);
document.getElementById("markCell").addEventListener("click", cellMark);
