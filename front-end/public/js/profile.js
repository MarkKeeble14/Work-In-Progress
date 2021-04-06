let loggedInId;
let profileId;
let loggedInDName;
let profileDName;

function processUpdateProject() {
    // Replace this with getting the data from the fields
    const title = "other title";
    const description = "new description";
    const tagList = "this,is,new";

    const url = "http://markkeeble.com/Work-in-Progress/API/v1/projects/" + 2;
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

function checkUser() {
    // Retrieve the object from storage
    let retrievedObject = localStorage.getItem('user');

    if (retrievedObject != null && retrievedObject != undefined) {
        const json = JSON.parse(retrievedObject);
        loggedInId = json.id;
        loggedInDName = json.display_name;
    }
    getAccData();
}
checkUser();

function processUpdateAccountInfo() {
    const dName = document.getElementById("profile-display-name").value;
    const personalURL = document.getElementById("profile-website-URL").value;
    const accType = document.getElementById("profile-account-type").value;
    const email = document.getElementById("profile-email").value;

    const url = "http://markkeeble.com/Work-in-Progress/API/v1/profile/" + loggedInId;
    const data = JSON.stringify({ dName: dName, personalURL: personalURL, accType: accType, email: email });
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

function getAccData() {
    const urlParams = new URLSearchParams(window.location.search);
    profileId = urlParams.get('id');

    if (profileId != null && profileId != undefined) {
        getAccDataID(profileId);
    } else {
        if (loggedInId) {
            getAccDataID(loggedInId);
        } else {
            console.log("no id given; empty profile");
        }
    }
}

function getAccDataID(id) {
    const url = "http://markkeeble.com/Work-in-Progress/API/v1/profile/" + id;
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.onreadystatechange = function () { 
        if (http.readyState == 4) {
            if (http.status == 200) {
                setProfileInfo(http.responseText);
            } else {
                console.log(http.responseText);
            }
        }
    }
    http.send();
}


function setProfileInfo(data) {
    const json = JSON.parse(data)[0];
    if (json == undefined)
        return;
    const email = json.email;
    const displayName = json.display_name;
    const accType = json.account_type;
    const pURL = json.personal_website_url;

    profileId = json.id;
    profileDName = displayName;

    document.getElementById("profile-display-name").value = displayName;
    document.getElementById("profile-email").value = email;
    document.getElementById("profile-account-type").value = accType;
    document.getElementById("profile-website-URL").value = pURL;

    getAccProjects();
    getOwnedProjects();
    getProfileComments();
}

function getAccProjects() {
    const url = "http://markkeeble.com/Work-in-Progress/API/v1/profile/" + loggedInId + "/projects";
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.onreadystatechange = function () { 
        if (http.readyState == 4) {
            if (http.status == 200) {
                let node = document.getElementById("joined-item-display");
                setProfileProjects(http.responseText, node);
            } else {
                console.log(http.responseText);
            }
        }
    }
    http.send();
}

function getOwnedProjects() {
    const url = "http://markkeeble.com/Work-in-Progress/API/v1/profile/" + loggedInId + "/projects/owned";
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.onreadystatechange = function () { 
        if (http.readyState == 4) {
            if (http.status == 200) {
                let node = document.getElementById("owned-item-display");
                setProfileProjects(http.responseText, node);
            } else {
                console.log(http.responseText);
            }
        }
    }
    http.send();
}

function setProfileProjects(data, attachTo) {
    const json = JSON.parse(data);
    for(let i = 0; i < json.length; i++) {
        let obj = json[i];
        
        createCard(obj, attachTo);
    }
}

function getProfileComments() {
    let url;
    if (profileId != null && profileId != undefined) {
        url = "http://markkeeble.com/Work-in-Progress/API/v1/profile/" + profileId + "/comments";
    } else {
        url = "http://markkeeble.com/Work-in-Progress/API/v1/profile/" + loggedInId + "/comments";
    }

    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.onreadystatechange = function () { 
        if (http.readyState == 4) {
            if (http.status == 200) {
                setProfileComments(http.responseText);
            } else {
                console.log(http.responseText);
            }
        }
    }
    http.send();
}

function setProfileComments(data) {
    const json = JSON.parse(data);
    for(let i = 0; i < json.length; i++) {
        let obj = json[i];
        addComment(obj);
    }
    const table = document.getElementById("profile-comment-table");
    // Create an empty <tr> element and add it to the 1st position of the table:
    let row = table.insertRow(0);

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);

    // Add some text to the new cells:
    cell1.innerHTML = "From";
    cell2.innerHTML = "Text";
}

function addComment(data) {
    const table = document.getElementById("profile-comment-table");
    const from = data.user_made_comment_id;
    const text = data.comment_content;

    // Create an empty <tr> element and add it to the 1st position of the table:
    let row = table.insertRow(0);

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
        
    // Add some text to the new cells:
    cell1.innerHTML = from;
    cell2.innerHTML = text;
}

function processMakeComment() {
    // Retrieve the object from storage
    let retrievedObject = localStorage.getItem('user');

    if (retrievedObject != null && retrievedObject != undefined 
        && profileId != null && profileId != undefined) {
        const json = JSON.parse(retrievedObject);

        let text = document.getElementById("profile-comment-input").value;

        const url = "http://markkeeble.com/Work-in-Progress/API/v1/profile/" + profileId + "/comment";
        const data = JSON.stringify({ from: loggedInId, from_name: loggedInDName, to: profileId, to_name: profileDName, text: text });
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
}

function createCard(obj, attachTo) {
    let d1 = document.createElement('div');
    d1.setAttribute("id", "project-card-" + obj.id);
    d1.setAttribute("class", "proj-container proj-active");
    d1.addEventListener('click', function() {
        goToProject(obj.id);
    });

    let d2 = document.createElement('div');
    d2.setAttribute("class", "proj-details");

    let d3 = document.createElement('div');
    d3.setAttribute("class", "proj-bg proj-bg-fader");
    
    let d4 = document.createElement('div');
    d4.setAttribute("class", "proj-bg");

    let d5 = document.createElement('div');
    d5.setAttribute("class", "proj-info")

    let title = document.createElement('h3');
    title.setAttribute("class", "proj-title");
    title.innerHTML = obj.title;

    let d6 = document.createElement('div');
    d6.setAttribute("class", "proj-tags-container");

    let d7 = document.createElement('div');
    d7.setAttribute("class", "proj-tags-list");

    let share = document.createElement('a');
    share.innerHTML = "Share";
    share.setAttribute("class", "proj-share");
    share.setAttribute("href", "./index.html");

    setTagList(d7, obj.tag_list);
    
    d6.appendChild(d7);
    d5.appendChild(title);
    d5.appendChild(d6);
    // d5.appendChild(share);
    d2.appendChild(d3);
    d2.appendChild(d4);
    d2.appendChild(d5);
    d1.appendChild(d2);

    attachTo.appendChild(d1);
}

function setTagList(node, str) {
    let list = str.split(",");
    list.forEach(element => {
        let p = document.createElement("p");
        p.innerHTML = element;
        node.appendChild(p);
    });
}

// CHANGE URL
function goToProject(id) {
    window.location.href = "file:///C:/Users/Mark/Documents/Projects/WIP/Work-In-Progress/front-end/project.html?id=" + id;
}

function processDeleteAcc() {
    const url = "http://markkeeble.com/Work-in-Progress/API/v1/profile/" + loggedInId + "/delete";
    const http = new XMLHttpRequest();
    http.open("DELETE", url, true);
    http.onreadystatechange = function () { 
        if (http.readyState == 4) {
            console.log(http.responseText);
        }
    }
    http.send();
}