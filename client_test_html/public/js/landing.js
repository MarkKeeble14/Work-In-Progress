function processSignup() {
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const email = document.getElementById("sign-up-form-email").value;
    if (!email.match(mailformat)) {
        alert("invalid email!");
        return;
    }
    let dName = document.getElementById("sign-up-form-display-name").value;
    const password = document.getElementById("sign-up-form-password").value;
    if (!validatePassword(password)) {
        alert("invalid password!");
        return;
    }

    if (dName == undefined || dName.length < 2)
        dName = email;

    const url = "http://markkeeble.com/Work-in-Progress/API/v1/signup";
    const data = JSON.stringify({ email: email, displayName: dName, password: password });
    const http = new XMLHttpRequest();
    
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function () { 
        if (http.readyState == 4) {
            if (http.status == 200) {
                loginAfterSignup(http.responseText);
            } else {
                console.log(http.responseText);
            }
        }
    }
    http.send(data);
}

function validatePassword(password) {
    // Validate lowercase letters
    let lowerCaseLetters = /[a-z]/g;
    if(password.match(lowerCaseLetters)) {
    } else {
        return false;
    }

    // Validate capital letters
    let upperCaseLetters = /[A-Z]/g;
    if(password.match(upperCaseLetters)) {
    } else {
        return false;
    }

    // Validate numbers
    let numbers = /[0-9]/g;
    if(password.match(numbers)) {
    } else {
        return false;
    }

    // Validate length
    if(password.length >= 8) {
    } else {
        return false;
    }
    return true;
}

function loginAfterSignup(data) {
    const json = JSON.parse(data);
    
    const id = json.insertId;

    const url = "http://markkeeble.com/Work-in-Progress/API/v1/profile/" + id;
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.onreadystatechange = function () { 
        if (http.readyState == 4) {
            if (http.status == 200) {
                login(http.responseText);
            } else {
                console.log(http.responseText);
            }
        }
    }
    http.send();
}

function login(data) {
    const json = JSON.parse(data)[0];
    const id = json.id;
    const displayName = json.display_name;

    // Store user details in local storage
    let userDetails = { id: id, displayName: displayName };
    localStorage.setItem('user', JSON.stringify(userDetails));

    // Link to profile page maybe, need to change
    window.location.href = "file:///C:/Users/Mark/Documents/Projects/WIP/Work-In-Progress/client_test_html/profile.html?id=" + id; 
}

function loginThroughForm() {
    const email = document.getElementById("login-form-email").value;
    const password = document.getElementById("login-form-password").value;

    const url = "http://markkeeble.com/Work-in-Progress/API/v1/authenticate";
    const data = JSON.stringify({ email: email, password: password });
    const http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function () { 
        if (http.readyState == 4) {
            if (http.status == 200) {
                const result = http.responseText;
                if (result != "false") {
                    login(http.responseText);
                }
            } else {
                console.log(http.responseText);
            }
        }
    }
    http.send(data);
}