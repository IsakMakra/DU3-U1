"use strict";

let type_login = "LOGIN";
let text_login = "Let the magic start!"; 
let change_view_login = "New to this? Register for free";

let type_register = "REGISTER";
let text_register = "Ready when you are..."; 
let change_view_register = "Already have an account? Go to login";

let content = document.querySelector("section");

function display_login_or_register (type, text, change_view) {
    content.innerHTML = ``;
    content.innerHTML = `
        <h1>${type}</h1>
        <div> 
            <p id="un">User Name:</p>
            <input name="un"> 
            <p id="pw">Password:</p>
            <input name="pw">
            <p id="text">${text}</p>
            <button>${type}</button>
        </div>
        <p id="change_view">${change_view}</p>
    `;
}

function login_page() {
    display_login_or_register(type_login, text_login, change_view_login);
    let login_button = document.querySelector("button");
    login_button.addEventListener("click", login_handler);

    function login_handler (event) {
        let username_input = document.querySelector("input[name='un']").value;
        let password_input = document.querySelector("input[name='pw']").value;
        
        console.log(`Username: ${username_input}`);
        console.log(`Password: ${password_input}`);

        //ADD STUFF
    }

    let change_view = document.querySelector("#change_view");
    change_view.addEventListener("click", change_page);
}

function register_page() {
    display_login_or_register(type_register, text_register, change_view_register);
    let register_button = document.querySelector("button");
    register_button.addEventListener("click", register_handler);

    function register_handler (event) {
        let username_input = document.querySelector("input[name='un']").value;
        let password_input = document.querySelector("input[name='pw']").value;
        
        console.log("New Account Created:");
        console.log(`Username: ${username_input}`);
        console.log(`Password: ${password_input}`);

        //ADD STUFF
    }

    let change_view = document.querySelector("#change_view");
    change_view.addEventListener("click", change_page);
}

function change_page () {
    if (document.querySelector("h1").textContent === type_login) {
        register_page();
    }
    else if (document.querySelector("h1").textContent === type_register) {
        login_page();
    }
}