function login(){
	console.log('Logging in to the database ');
	var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
           if (xmlhttp.status == 200){ 
		      console.log(this.responseText);
			   updatePage(this.responseText);
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned, Taylor says not 400 either, probs like 342');
           }
        }
    };

	//ID for Heroku 3, other 1
    xmlhttp.open("GET", "/getUser?id=3", true);
    xmlhttp.send();	
}

function updatePage(results){
	var json = JSON.parse(results);
	console.log(json);
	var out = "";
	var i;
	out += '<h1>Welcome To Your Goals</h1> ';
	for(i = 0; i < json.length; i++){
		out += '<div>' + json[i].goalname + '</div>';
	}
	document.getElementById("div1").innerHTML = out;
	
	
	
	
}