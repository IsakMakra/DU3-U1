"use strict";

let type_login = "LOGIN";
let login_text = "Let the magic start!"; 
let change_type_login_text = "New to this? Register for free";

let type_register = "REGISTER";
let register_text = "Ready when you are..."; 
let change_type_register_text = "Already have an account? Go to login";

let background = document.querySelector("main");
let main_content = document.querySelector("section");

let at_login_page;
let at_register_page;

function create_login_or_register_page (type, text, change_type_text) {

    main_content.innerHTML = ``;
    main_content.innerHTML = `
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

    create_login_or_register_page(type, text, change_type_text);

    let action_button = document.querySelector("button");
    action_button.addEventListener("click", input_handler);

    let change_type_button = document.querySelector("#change_type_text");
    change_type_button.addEventListener("click", change_type);

    function change_type () {

        if (type === type_login) {

            display_login_or_register_page(type_register, register_text, change_type_register_text);

        }
        else if (type === type_register) {

            display_login_or_register_page(type_login, login_text, change_type_login_text);

        }
    }

    function input_handler (event) {

        let username_input = document.querySelector("input[name='un']").value;
        let password_input = document.querySelector("input[name='pw']").value;
        
        if (type === type_login) {

            let GET_request = new Request(`${login_register_prefix}?action=check_credentials&user_name=${username_input}&password=${password_input}`);
            
            login_handler();

            async function login_handler() {

                await fetch_handler(GET_request);

                if (login_success === true) {

                    local_storage_save_credentials(username_input);

                    function local_storage_save_credentials(username) {
                
                        let credentials = {
                
                            user_name: username,
                
                        }
                
                        let saved_credentials_stringified = JSON.stringify(credentials);
                        localStorage.setItem("credentials", saved_credentials_stringified);
                
                    }

                    display_quiz_page(username_input);

                }
            }
        }
        else if (type === type_register) {

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
