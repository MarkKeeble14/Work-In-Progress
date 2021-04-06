function getProjects() {
    const url = "http://markkeeble.com/Work-in-Progress/API/v1/projects/fetch";
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.onreadystatechange = function () { 
        if (http.readyState == 4) {
            if (http.status == 200) {
                createProjectsFromData(http.responseText);
            } else {
                console.log(http.responseText);
            }
        }
    }
    http.send();
}
getProjects();

function createProjectsFromData(data) {
    const json = JSON.parse(data)[0];
    for(let i = 0; i < json.length; i++) {
        let obj = json[i];

        createCard(obj);
    }
}

function createCard(obj) {
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
    //d5.appendChild(share);
    d2.appendChild(d3);
    d2.appendChild(d4);
    d2.appendChild(d5);
    d1.appendChild(d2);

    let container = document.getElementById("item-display");
    container.appendChild(d1);
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