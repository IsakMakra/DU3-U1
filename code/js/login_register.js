"use strict";

let type_login = "LOGIN";
let funny_text_login = "Let the magic start!"; 
let change_page_text_login = "New to this? Register for free";

let type_register = "REGISTER";
let funny_text_register = "Ready when you are..."; 
let change_page_text_register = "Already have an account? Go to login";

let content = document.querySelector("section");

function create_login_or_register (type, funny_text, change_page_text) {
    content.innerHTML = ``;
    content.innerHTML = `
        <h1>${type}</h1>
        <div id ="input_field"> 
            <p class="login_credentials" id="un">User Name:</p>
            <input name="un"> 
            <p class="login_credentials" id="pw">Password:</p>
            <input name="pw">
            <p id="funny_text">${funny_text}</p>
            <button>${type}</button>
        </div>
        <p id="change_page">${change_page_text}</p>
    `;
}

function display_login_or_register_page(type, funny_text, change_page_text) {

    create_login_or_register(type, funny_text, change_page_text);

    let current_type = document.querySelector("h1").textContent;

    let button = document.querySelector("button");
    button.addEventListener("click", input_handler);

    let change_page_button = document.querySelector("#change_page");
    change_page_button.addEventListener("click", change_page);

    function change_page () {
        if (current_type === type_login) {
            display_login_or_register_page(type_register, funny_text_register, change_page_text_register);
        }
        else if (document.querySelector("h1").textContent === type_register) {
            display_login_or_register_page(type_login, funny_text_login, change_page_text_login);
        }
    }

    function input_handler (event) {

        let username_input = document.querySelector("input[name='un']").value;
        let password_input = document.querySelector("input[name='pw']").value;
        
        if (current_type === type_login) {
            console.log("You Tried To Login With The Following...");
            console.log(`Username: ${username_input}`);
            console.log(`Password: ${password_input}`);
        }
        else if (current_type === type_register) {
            console.log("A New Account Has Been Made...")
            console.log(`Username: ${username_input}`);
            console.log(`Password: ${password_input}`);
        }
    
        //ADD STUFF
    }
}
