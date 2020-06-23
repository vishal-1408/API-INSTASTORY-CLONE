var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var storyRoutes = require("./routes/story.js");
var indivStoryRoutes = require("./routes/indivstory.js");
var storyCommentRoutes = require("./routes/comments.js");

mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);
mongoose.connect("mongodb+srv://vishal:8106717061@cluster0-epkvs.mongodb.net/instastories");

app.use(bodyParser.urlencoded({
  extend: true
}));
app.use(storyRoutes);
app.use(indivStoryRoutes);
app.use(storyCommentRoutes);


//Server
let port = process.env.PORT;
if(port == null || port== ""){
  port = 3000;
}
app.listen(port,()=>{
  console.log("server on");
})
