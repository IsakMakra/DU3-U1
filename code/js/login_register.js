"use strict";

let type_login = "LOGIN";
let type_register = "REGISTER";

let text_login = "Let the magic start!"; 
let change_type_text_login = "New to this? Register for free";
let text_register = "Ready when you are..."; 
let change_type_text_register = "Already have an account? Go to login";

let background = document.querySelector("main");
let content = document.querySelector("section");

let at_login_page;
let at_register_page;

function create_login_or_register (type, text, change_type_text) {

    content.innerHTML = ``;
    content.innerHTML = `
        <h1>${type}</h1>
        <div id ="input_field"> 
            <p class="login_credentials" id="un">User Name:</p>
            <input name="un"> 
            <p class="login_credentials" id="pw">Password:</p>
            <input type="password" name="pw">
        </div>
        <p id="text">${text}</p>
        <button>${type}</button>
        <div id="change_type">
            <p id="change_type_text">${change_type_text}</p>
        </div>
    `;

    if (type === type_register) {

        background.style.backgroundColor = "red";
        at_register_page = true;
        at_login_page = false;        

    }
    else {

        background.style.backgroundColor = "orangered"
        at_register_page = false;
        at_login_page = true;

    }
}

function display_login_or_register_page(type, text, change_type_text) {

    create_login_or_register(type, text, change_type_text);

    let current_type = document.querySelector("h1").textContent;

    let button = document.querySelector("button");
    button.addEventListener("click", input_handler);

    let change_type_button = document.querySelector("#change_type_text");
    change_type_button.addEventListener("click", change_type);

    function change_type () {

        if (current_type === type_login) {

            display_login_or_register_page(type_register, text_register, change_type_text_register);

        }
        else if (current_type === type_register) {

            display_login_or_register_page(type_login, text_login, change_type_text_login);

        }
    }

    function input_handler (event) {

        let username_input = document.querySelector("input[name='un']").value;
        let password_input = document.querySelector("input[name='pw']").value;
        
        if (current_type === type_login) {

            let GET_request = new Request(`${login_register_prefix}?action=check_credentials&user_name=${username_input}&password=${password_input}`);
            
            get_credentials();

            async function get_credentials() {

                let login_resource = await fetch_handler(GET_request);

                if (login_ok === true) {

                    display_quiz_page(login_resource.data);

                }
            }
        }
        else if (current_type === type_register) {

            let body_post = {

                action: "register",
                user_name: username_input,
                password: password_input,

            }

            let options = {

                method: "POST",
                body: JSON.stringify(body_post),
                headers:{"Content-type":"application/json; charset=UTF-8"},

            }

            let POST_request = new Request(login_register_prefix, options);
            fetch_handler(POST_request);

        }
    }
}
