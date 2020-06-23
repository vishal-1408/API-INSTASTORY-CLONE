var mongoose = require("mongoose");

var storySchema = new mongoose.Schema({
  caption: String,
  im1: {
    url: String,
    publicid: String
  },
  im2: {
    url: String,
    publicid: String
  },
  comments:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]


})

var Story = mongoose.model("Story", storySchema);

module.exports = Story;
