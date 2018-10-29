console.log("rblx-antiscams started, preparing for use...");
var ROBLOX = require("noblox.js");
var REQUEST = require("request");
var DATE = new Date();

var BOT_USERNAME = process.env.RobloxUsername;
var BOT_PASSWORD = process.env.RobloxPassword;
var GROUPID = process.env.GroupId;

var KEYWORDS = [
  "free robux",
  "thousands of robux",
  "is giving access to",
  "giving access",
  "all game passes",
  "this is an official event",
  "official event",
  "no info needed",
  "to the following link",
  "claim robux",
  "R$ Instantly",
  "rewardbuddy.me"
];

console.log("Attempting to login into ROBLOX.com");
ROBLOX.login(BOT_USERNAME,BOT_PASSWORD).then(function() {
  console.log("Successfully logged into BOT " + BOT_USERNAME);
  ROBLOX.onWallPost({group: GROUPID}).on("data", function(data) {
    console.log("[" + GROUPID + "] New post detected, checking context...");
    var containsKeyword = false;
    for (let phrase in KEYWORDS) {
      if (data.content.toLowerCase().search(phrase) == -1) {
        containsKeyword = true;
      };
    };
    if (containsKeyword == true) {
      ROBLOX.deleteWallPost({id:data.id, group:GROUPID}).catch(function(e) {
        console.log("[" + GROUPID + "] Error deleting post by " + data.author.name);
        console.log("[" + GROUPID + "] " + e);
      });
      console.log("[" + GROUPID + "] Removed post by " + data.author.name);
    };
  });
  ROBLOX.getWall({group: GROUPID}).then(function(data){
    var Posts = data.posts
    for ( var i = 0; i < data.posts.length; i ++ ){
      var containsKeyworld = false
      var message = Posts[i]
      for (let phrase of KEYWORDS){
        console.log(message.content.toLowerCase().search(phrase)
        if (message.content.toLowerCase().search(phrase) == -1) {
          containsKeyword = true;
        }
      };
      if (containsKeyword == true) {
        ROBLOX.deleteWallPost({id:Posts.id, group:GROUPID}).catch(function(e) {
          console.log("[" + GROUPID + "] Error deleting post by " + data.author.name);
          console.log("[" + GROUPID + "] LOG: " + e);
        });
        console.log("[" + GROUPID + "] Removed post by " + data.author.name);
      };
    }
  });
}).catch(function(e) {console.log("Failed to log in as " + BOT_USERNAME + ", are the ROBLOX servers down?");});
