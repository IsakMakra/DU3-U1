"use strict";

function get_random_number() {

    return Math.floor(Math.random() * (ALL_BREEDS.length - 0) + 0);

}

let quiz_time = false;

function display_quiz_page(credentials_logged_in) {

    quiz_time = true;

    content.innerHTML = "";
    background.style.backgroundColor = "orangered";

    let logged_in_dom = document.createElement("div");
    content.appendChild(logged_in_dom);
    logged_in_dom.classList.add("logged_in");
    logged_in_dom.innerHTML = `
        <p>${credentials_logged_in.user_name}</p>
    `;
    
    let logout_button = document.createElement("button");
    logged_in_dom.appendChild(logout_button);
    logout_button.classList.add("logout_button");
    logout_button.textContent = "logout";
    logout_button.addEventListener("click", local_storage_remove_credentials);

    local_storage_save_credentials(credentials_logged_in.user_name, credentials_logged_in.password);

    function local_storage_remove_credentials(event) {

        localStorage.removeItem("credentials");
        location.reload();

    }

    function local_storage_save_credentials(us, pw) {

        let credentials = {

            user_name: us,
            password: pw,

        }

        let credentials_stringified = JSON.stringify(credentials);
        localStorage.setItem("credentials", credentials_stringified);

    }

    quiz_handler();

}

function quiz_handler() {

    let img = document.createElement("img");
    content.appendChild(img);
    img.setAttribute("src", "media/logo.png");
    img.classList.add("image");

    display_message("Getting random image...");

    get_question();

    async function get_question() {

        let correct_breed = get_random_number();

        let prefix = get_pic_prefix(ALL_BREEDS[correct_breed].url);
        let resource = await fetch_handler(prefix);
        img.removeAttribute("src");
        await img.setAttribute("src", resource.message);

        let options = document.createElement("div");
        options.classList.add("options");
        content.appendChild(options);

        let options_array = [];
        options_array.push(correct_breed);

        for(let i = 0; i < 3; i++) {
            
            let random_breed = get_random_number();

            for(let ii = 0; ii < options_array.length; ii++) {

                if(random_breed === options_array[ii]) {

                    continue;
                    ii++;

                }
                else {

                    options_array.push(random_breed);

                }

            }

            create_option(random_breed);

        }

        create_option(correct_breed);

        function create_option(random_or_correct) {

            let option_button = document.createElement("button");
            option_button.classList.add("option");
            options.appendChild(option_button);
            option_button.textContent = `${ALL_BREEDS[random_or_correct].name}`;
            option_button.style.order = get_random_number();

            if(random_or_correct === correct_breed) {

                option_button.addEventListener("click", () => display_message("Correct!", "ONE MORE"));

            }
            else {

                option_button.addEventListener("click", () => display_message("Wrong! Try again!", "ONE MORE"));
                
            }
        
        }

    }
}