"use strict";

let account_prefix = "https://teaching.maumt.se/apis/access/";
// JSON, 
//POST - 
//GET - 

function get_pic_prefix(breed_url) {
    let URL = `https://dog.ceo/api/breed/${breed_url}/images/random`;
    return URL;
}
//console.log(fetch_handler(get_breed_prefix(ALL_BREEDS[0].url)));
// argument must be ALL_BREEDS[?].url
// do a fetch with the new URL (JSON), the key "message" of the resource is a link to the picture.


