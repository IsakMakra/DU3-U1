"use strict";

let login_ok = false;

async function fetch_handler (URL) {

    display_message("Contacting Server...");

    let response = await fetch(URL);

    await console.log(response);
    
    remove_message();

    if (response.status === 418) {

        display_message("The server thinks it´s not a teapot!");

    }
    else if (response.status === 409) {

        display_message("Sorry, that name is taken. Please try with another one");

    }
    else if (response.status === 404) {

        let text = document.querySelector("#text");
        text.textContent = "Wrong username or password.";
        text.classList.add("wrong_credentials");

    }
    else if (response.status === 200 && at_register_page === true) {

        display_message("Registration Complete. Proceed to login.")

    }
    else {
        login_ok = true;
    }

    let resource = await response.json();
    await console.log(resource);
    return resource;
}

let overlay = document.querySelector("#overlay");
let box = document.querySelector("#box");

function display_message(message) {

    overlay.classList.add("overlay");

    box.classList.add("box");
    box.textContent = message;

    if (message === "Contacting Server...") {

        return;

    }

    let box_button = document.createElement("button");
    box_button.textContent = "CLOSE";
    box_button.classList.add("close_button");
    box.appendChild(box_button);
    box_button.addEventListener("click", button_clicked);

    function button_clicked(event) {

        remove_message();

    }

}

function remove_message() {

    overlay.classList.remove("overlay");
    box.innerHTML = "";
    box.classList.remove("box");
    
}