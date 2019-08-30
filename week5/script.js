//Set up API and event listeners

document.addEventListener('DOMContentLoaded', buttons);

function buttons(){
	
	var api = 'fa7d80c48643dfadde2cced1b1be6ca1';
	
	//GET form for weather data
	document.getElementById('cityZipSub').addEventListener('click', function(event){
		var request = new XMLHttpRequest();
		var data = {input:null};
		data.input = document.getElementById('input').value;
		
		if(data.input.match(/\b\d{5}\b/g)){ //for zip code entry
			request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?zip=' + data.input + '&appid=' + api, true);
		}
		else if(data.input.match(/^[a-zA-Z ]+$/)){ //for city entry
			request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + data.input + '&appid=' + api, true);
		}
		
		request.addEventListener('load', function(){
			if(request.status >= 200 && request.status < 400){
				var output = JSON.parse(request.responseText);
				var fahr = (output.main.temp * (9/5) - 459.67).toFixed(0);
				console.log(output);
				
				document.getElementById('inputDisplay').textContent = data.input;
				document.getElementById('tempDisplay').textContent = fahr + ' F';
			}
			else{
				console.log("Network Request Error: " + request.statusText);
			}
		});
		
		request.send(JSON.stringify(data));
		event.preventDefault();
	});
	
	//POST form for user entered string
	document.getElementById('submitForm').addEventListener('click', function(event){
		var request = new XMLHttpRequest();
		var data = {favFood:null};
		data.favFood = document.getElementById('inputForm').value;
		
		request.open('POST', 'http://httpbin.org/post', true);
		request.setRequestHeader('Content-Type', 'application/JSON');
		
		request.addEventListener('load', function(){
			if(request.status >= 200 && request.status < 400){
				var output = JSON.parse(request.responseText);
				console.log(output);
				
				var postData = JSON.parse(output.data);
				console.log(postData);
				
				document.getElementById('outputData').textContent = output.data.favFood;
			}
			else{
				console.log("Network Request Error: " + request.statusText);
			}
		});
		
		request.send(JSON.stringify(data));
		event.preventDefault();
	});
}