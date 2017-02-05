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

//tokens array
var tokens = [];

//sets the list of current users connected tokens
exports.setTokens = function(tokenArray){
  tokens = tokenArray;
}

exports.setSpot = function(spotify){
  spot = spotify;
}

//function to print tokens
exports.printTokens = function(){
  console.log(tokens);
}

//get the data to pass to the algorithm
exports.fetch = function(num_of_tracks = 10, num_of_artists = 10){

  var ids = [];
  var tts = [];
  var TAs = [];

  for(i = 0; i < tokens.length; i++){

    spot.setAccessToken(tokens[i].token);

    spot.getUser(tokens[i].userId).then(function(data){
      console.log("here");
      console.log(data.body);
    });

    spot.getMyTopTracks({limit: num_of_tracks}).then(function(tt_data){
      // console.log(tt_data.body);
    });
  }
  // console.log(IDs[1]);
}
