const fetch = require("node-fetch");

fetch("http://localhost:3000/index")
    .then(res => res.json())
    .then(json => {
        console.log(json);
    });