let loggedInId;
let loggedInDName;

function checkUser() {
    // Retrieve the object from storage
    let retrievedObject = localStorage.getItem('user');

    if (retrievedObject != null && retrievedObject != undefined) {
        const json = JSON.parse(retrievedObject);
        loggedInId = json.id;
        loggedInDName = json.display_name;
    }
}
checkUser();

function openPage(pageName,elmnt,color) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

function processCreateProject() {
    const title = document.getElementById("post-project-title").value;
    const description = document.getElementById("post-project-description").value;
    const tags = document.getElementById("post-project-tags").value;


    const url = "http://markkeeble.com/Work-in-Progress/API/v1/projects/create";
    const data = JSON.stringify({ title: title, description: description, tagList: tags, ownerId: loggedInId });
    const http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function () { 
        if (http.readyState == 4) {
            console.log(http.responseText);
        }
    }
    http.send(data);
}