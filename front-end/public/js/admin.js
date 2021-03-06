function getAdminData() {
    const url = "https://markkeeble.com/Work-in-Progress/API/v1/admin";
    const http = new XMLHttpRequest();
    const key = "?apiKey1=MyAPIKey";
    http.open("GET", url + key, true);
    http.onreadystatechange = function () { 
        if (http.readyState == 4) {
            if (http.status == 200) {
                processAdminInfo(http.responseText);
            } else {
                console.log(http.responseText);
            }
        }
    }
    http.send();
}

function proccessAdmin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (email == "" || password == "") {
        document.getElementById("message").innerHTML = "Please enter a username and password";
        return;
    }
    const key = "?apikey1=MYAPIKey"
    const url = "https://markkeeble.com/Work-in-Progress/API/v1/administration";
    const http = new XMLHttpRequest();
    const data = JSON.stringify({email: email, password: password});
    http.open("POST", url + key, true);
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function() {
        if (http.readyState == 4) {
            if (http.status == 200) {
                getAdminData();
            } else {
                console.log(http.responseText);
            }
        }

    }
    http.send(data);

}





function processAdminInfo(data) {
    const table = document.getElementById("data-table");

    const response = JSON.parse(data);
    const json = response[0];
    for(var i = 0; i < json.length; i++) {
        var obj = json[i];

        // Create an empty <tr> element and add it to the 1st position of the table:
        var row = table.insertRow(0);

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
            
        // Add some text to the new cells:
        cell1.innerHTML = obj.endpoint;
        cell2.innerHTML = obj.method;
        cell3.innerHTML = obj.uses;
    }
    // Create an empty <tr> element and add it to the 1st position of the table:
    var row = table.insertRow(0);

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    // Add some text to the new cells:
    cell1.innerHTML = "Endpoint";
    cell2.innerHTML = "Method";
    cell3.innerHTML = "# of Times Used";
}