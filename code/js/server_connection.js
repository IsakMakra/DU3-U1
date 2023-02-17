"use strict";

let login_ok = false;

let overlay = document.querySelector("#overlay");
let box = document.querySelector("#box");

async function fetch_handler (URL) {

    if(quiz_time !== true) {
        display_message("Contacting Server...", "CLOSE");
    }

    let response = await fetch(URL);
    
    remove_message();

    if (response.status === 418) {

        display_message("The server thinks it´s not a teapot!", "CLOSE");

    }
    else if (response.status === 409) {

        display_message("Sorry, that name is taken. Please try with another one", "CLOSE");

    }
    else if (response.status === 404 && at_login_page === true || response.status === 400 && at_login_page === true) {

        let text = document.querySelector("#text");
        text.textContent = "Wrong username or password.";
        text.classList.add("wrong_credentials");

    }
    else if (response.status === 200 && at_register_page === true) {

        display_message("Registration Complete. Proceed to login.", "CLOSE")

    }
    else if (response.status === 200 && at_login_page === true) {

        login_ok = true;

    }

    console.log(response);
    return response;

}

function display_message(message, close_message) {

    overlay.classList.add("overlay");

    box.classList.add("box");
    box.textContent = message;

    if (message === "Contacting Server..." || message === "Getting random image...") {

        return;

    }

    let box_button = document.createElement("button");
    box_button.textContent = close_message;
    box_button.classList.add("close_button");
    box.appendChild(box_button);

    box_button.addEventListener("click", button_clicked);

    if(message === "Correct!") {

        box.style.backgroundColor = "lime";
        
    }
    else {

        box.style.backgroundColor = "red";

    }

    function button_clicked(event) {
        
        box.style.backgroundColor = "red";

        if(quiz_time === true) {
            
            remove_message();
            let last_login = JSON.parse(localStorage.getItem("credentials"));
            display_quiz_page(last_login.user_name);

        }
        else {

            remove_message();
            
        }
    }

}

function remove_message() {

    overlay.classList.remove("overlay");
    box.innerHTML = "";
    box.classList.remove("box");
    
}