function login(){
	var username = $("#username").val();
	var password = $("#password").val();

	var params = {
		username: username,
		password: password
	};

	$.post("/login", params, function(result) {
		if (result && result.success) {
			$("#status").text("Logging in was a success");
			differentLogin();
		} else {
			$("#status").text("Error logging in.");
		}
	});
}

function logout() {
	$.post("/logout", function(result) {
		if (result && result.success) {
			$("#status").text("Successfully logged out.");
		} else {
			$("#status").text("Error logging out.");
		}
	});
}


function differentLogin(){
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
    }

	//ID for Heroku 3, other 1
    xmlhttp.open("GET", "/getUser", true);
    xmlhttp.send();	
}

function updatePage(results){
	console.log(results);
	
	var json = JSON.parse(results);
	var listJson = JSON.parse(json);
	
	console.log(listJson);
	var out = "";
	var content ="";
	var i;
	out += '<h1>Welcome To Your Goals</h1> ';
	for(i = 0; i < listJson.length; i++){
		content +=  '<div>' + listJson[i].goalname + ': ' + listJson[i].description + '</div>';
	}
	document.getElementById("div1").innerHTML = out;
	document.getElementById("addingNew").innerHTML = content;
	
	var addGoal = 
		"<h2>Add A New Goal To Your List</h2>"
		+ "<form action='/addGoals' method='get'>"
		+ "<fieldset>" 
		+ "<label for='gname'>Goal Name:</label>"
        + "<input type='text' id='name' name='gname' placeholder='Enter your goals name' />"
		+ "<label for=endDate>End Date:</label>"
        + "<input type='date' id='endDate' name='endDate' placeholder='Select an end date for your goal'/>"
		+ "<label for='discription'>Description:</label>"
        + "<textarea id='desciption' name='desciption' placeholder='What did you want to accomplish?'></textarea>"
		+ "<input type='submit' value='Send message' /> </fieldset></form>";
	
	document.getElementById("addingNewGoals").innerHTML = addGoal;
	
}