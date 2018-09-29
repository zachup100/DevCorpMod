var rbx = require('noblox.js');
var request = require('request');

var username = process.env.RobloxUsername;
var password = process.env.RobloxPassword;

var groupId = process.env.GroupId;

var keywords = [
  "thousands of robux",
  "thousands",
  "is giving access to",
  "giving access",
  "all game passes",
  "this is an official event",
  "official event",
  "no info needed","to the following link",
  "👉: rewardtool.se",
  "rewardtool.se",
  "rewardtool"
];

rbx.login(username, password).then(function() {
  console.log("LoggedIn");
  rbx.getWall({group: groupId}).then(function(data){
    var posts = data.posts
    for(var i = 0; i < data.posts.length; i++) {
      var found = 0;
      var message = data.posts[i]
      for (let phase of keywords) {
        if (message.content.toLowerCase().search(phase) != -1) found +=5;
      }
      if (/\S+\.\S+/.exec(message.content)) {
      //  found += 5;
      }
      if (found >= 5) {
          console.log("Removing Scam post from " + message.author.name );
          rbx.deleteWallPost({id:message.id, group:groupId}).catch(function(e) { });
        //  rbx.exile({group: groupId, target: message.author, deleteAllPosts: true});
      }
    }
  }).catch(function(e) { console.log(e); });

  var onWallPost = rbx.onWallPost({group: groupId});
  onWallPost.on("data", function(data) {
	console.log("New wall post detected.")
    var found = 0;
    for (let phase of keywords) {
      if (data.content.toLowerCase().search(phase) != -1) found+=5;
    }
    if (/\S+\.\S+/.exec(data.content)) {

    }
    if (found >= 5) {
        console.log("Removing post with `" + data.content + "`` content by " + message.author.name + "!");
      rbx.deleteWallPost({id:data.id, group:groupId}).catch(function(e) { });
    }
  });
  onWallPost.on("close", function(e) { console.log("The event has disconnected!"); });
  onWallPost.on("error", function(e) {});
}).catch(function(e) {
console.log('Unexpected error:', e);
});
