function login(){
	console.log('Logging in to the database ');
	var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
           if (xmlhttp.status == 200){ 
		      console.log(this.responseText);
			   updatePage(this.responseText);
			   console.log(this.responseText);
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
	var json = results;
	var out = "";
	var i;
	for(i = 0; i < results.length; i++){
		out += '<h1>Welcome To Your Goals ' + json[i] + '</h1>';
	}
	document.getElementById("div1").innerHTML = out;
}