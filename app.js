var express = require('express');
var request = require('request');
var fetch = require('./fetch');
var spotifyAPI = require('spotify-web-api-node');

var settings = {
  clientId : "cab4b5b99f96426e9dfaf76d268f3871",
  clientSecret: "3000734987d6434a963489d900c65641",
  redirectUri : "http%3A%2F%2F129.31.222.56%3A8080%2Fauth"
}

spot = new spotifyAPI({
  clientId : settings.clientId,
  clientSecret : settings.clientSecret,
  redirectUri : settings.redirectUri
});

var tokens = [];

var app = express();

app.get('/', function(req,res){
  res.sendfile('public/index.html');
});

app.get('/auth', function(req,res){
  if(req.query.code != undefined){
    code = req.query.code;
    request.post({url:'https://accounts.spotify.com/api/token', form:{"grant_type":"authorization_code","code": code, "redirect_uri": settings.redirectUri, "client_id": settings.clientId, "client_secret": settings.clientSecret}}, function(err, res_2, body){

      var access_token = JSON.parse(res_2.body).access_token;
      var userID;
      var user_token_pair;
      var refresh_token = JSON.parse(res_2.body).refresh_token;
      spot.setAccessToken(access_token);
      spot.setRefreshToken(refresh_token);

      spot.getMe().then(function(data){
          userID = data.body.id;
          user_token_pair = {userId: userID, token: access_token};
          tokens.push(user_token_pair);


      });

      fetch.setTokens(tokens);
      fetch.setSpot(spot);
      fetch.printTokens();
      fetch.fetch();
      res.send("Success!");


    });
  }else{
    res.send("U a bore bitch.");
  }
});

app.listen(8080, function(){
  console.log('listening on 4444');
});

// function user_exists(userId, tokens){
//   for(i = 0; i < tokens.length; i++){
//     if()
//   }
// }
