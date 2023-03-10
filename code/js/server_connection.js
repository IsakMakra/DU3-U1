"use strict";

let login_success = false;

let overlay = document.querySelector("#overlay");
let message_box = document.querySelector("#message_box");

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

        login_success = true;

    }

    console.log(response);
    return response;

}

function display_message(message_text, close_message_text) {

    overlay.classList.add("overlay");

    message_box.classList.add("message_box");
    message_box.textContent = message_text;

    if (message_text === "Contacting Server..." || message_text === "Getting random image...") {

        return;

    }

    let message_box_button = document.createElement("button");
    message_box_button.textContent = close_message_text;
    message_box_button.classList.add("close_button");
    message_box.appendChild(message_box_button);

    message_box_button.addEventListener("click", button_clicked);

    if(message_text === "Correct!") {

        message_box.style.backgroundColor = "lime";
        
    }
    else {

        message_box.style.backgroundColor = "red";

    }

    function button_clicked(event) {
        
        message_box.style.backgroundColor = "red";

        if(quiz_time === true) {
            
            remove_message();

            let current_login = JSON.parse(localStorage.getItem("credentials"));
            display_quiz_page(current_login.user_name);

        }
        else {

            remove_message();
            
        }
    }

}

function remove_message() {

    overlay.classList.remove("overlay");
    
    message_box.innerHTML = "";
    message_box.classList.remove("message_box");
    
}