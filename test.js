var fetch = require('./fetch');

var tokens = [{userID: "Kieran Rigby", token: "kkkkkkkkk"}, {userID: "Ryan Armiger", token: "rrrrrrr"}];

fetch.setTokens(tokens);
fetch.printTokens();
