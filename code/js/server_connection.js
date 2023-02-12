"use strict";

async function fetch_handler (URL) {
    let response = await fetch(URL);
    let resource = await response.json();
    return resource;
}