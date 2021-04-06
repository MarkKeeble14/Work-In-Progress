let loggedInId;
let projectId;
function checkUser() {
    // Retrieve the object from storage
    let retrievedObject = localStorage.getItem('user');

    if (retrievedObject != null && retrievedObject != undefined) {
        const json = JSON.parse(retrievedObject);
        loggedInId = json.id;

        const urlParams = new URLSearchParams(window.location.search);
        projectId = urlParams.get('id');

        if (projectId != null && projectId != undefined) {
            getProject();

            // Enable action buttons
            document.getElementById("common-action-buttons").classList.remove("hidden");
            document.getElementById("common-action-buttons").classList.add("visible");

            checkIfOwner();
        }
    }
}
checkUser();

function checkIfOwner() {
    const url = "http://markkeeble.com/Work-in-Progress/API/v1/profile/" + loggedInId + "/projects/" + projectId;
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.onreadystatechange = function () { 
        if (http.readyState == 4) {
            if (http.status == 200) {
                let res = JSON.parse(http.responseText.toLocaleLowerCase());
                if (res === true) {
                    document.getElementById("owner-action-buttons").classList.remove("hidden");
                    document.getElementById("owner-action-buttons").classList.add("visible");
                }
            } else {
                console.log(http.responseText);
            }
        }
    }
    http.send();
}

function joinProject() {
    const url = "http://markkeeble.com/Work-in-Progress/API/v1/profile/" + loggedInId + "/" + projectId;
    const http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.onreadystatechange = function () { 
        if (http.readyState == 4) {
            console.log(http.responseText);
        }
    }
    http.send();
}

function getProject() {

    if (projectId != null && projectId != undefined) {
        getProjectId(projectId);
    }
}

function getProjectId(id) {
    const url = "http://markkeeble.com/Work-in-Progress/API/v1/projects/" + id;
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.onreadystatechange = function () { 
        if (http.readyState == 4) {
            if (http.status == 200) {
                setProjectInformation(http.responseText);   
            } else {
                console.log(http.responseText);
            }
        }
    }
    http.send();
}

function setProjectInformation(data) {
    let json = JSON.parse(data)[0];
    setProjectPageFields(json);
}

function setProjectPageFields(json) {
    if (json == undefined) 
        return;
    document.getElementById("project-title").value = json.title;
    document.getElementById("project-description").value = json.description;
    document.getElementById("project-tags-list").value = json.tag_list;
}

function leaveProject() {
    const url = "http://markkeeble.com/Work-in-Progress/API/v1/profile/" + loggedInId + "/projects/" + projectId + "/leave";
    const http = new XMLHttpRequest();
    http.open("DELETE", url, true);
    http.onreadystatechange = function () { 
        if (http.readyState == 4) {
            console.log(http.responseText);
        }
    }
    http.send();
}

function deleteProject() {
    const url = "http://markkeeble.com/Work-in-Progress/API/v1/profile/" + loggedInId + "/projects/" + projectId + "/delete";
    const http = new XMLHttpRequest();
    http.open("DELETE", url, true);
    http.onreadystatechange = function () { 
        if (http.readyState == 4) {
            console.log(http.responseText);
        }
    }
    http.send();
}

function updateProject() {
    const title = document.getElementById("project-title").value;
    const description = document.getElementById("project-description").value;
    const tagList = document.getElementById("project-tags-list").value;

    const url = "http://markkeeble.com/Work-in-Progress/API/v1/projects/" + projectId;
    const data = JSON.stringify({ title: title, description: description, tagList: tagList });
    const http = new XMLHttpRequest();
    http.open("PUT", url, true);
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function () { 
        if (http.readyState == 4) {
            console.log(http.responseText);
        }
    }
    http.send(data);
}