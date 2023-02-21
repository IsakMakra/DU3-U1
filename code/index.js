"use strict";

let login_register_prefix = "https://teaching.maumt.se/apis/access/";

function get_image_prefix(breed_url) {

    let URL = `https://dog.ceo/api/breed/${breed_url}/images/random`;
    return URL;

}

let last_login = JSON.parse(localStorage.getItem("credentials"));

if (last_login !== null) {

    display_quiz_page(last_login.user_name);

}
else {

    display_login_or_register_page(type_login, login_text, change_type_login_text);

}