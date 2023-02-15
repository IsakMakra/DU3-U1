"use strict";

let login_register_prefix = "https://teaching.maumt.se/apis/access/";

function get_pic_prefix(breed_url) {

    let URL = `https://dog.ceo/api/breed/${breed_url}/images/random`;
    return URL;

}

let recent_credentials = JSON.parse(localStorage.getItem("credentials"));

if (recent_credentials !== null) {

    display_quiz_page(recent_credentials);

}
else {

    display_login_or_register_page(type_login, text_login, change_type_text_login);

}