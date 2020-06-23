var express = require("express");
var router = express.Router();
var upload = require("../multer.js");
var Story = require("../models/story.js");
var cloudinary = require("../cloudinary.js");
var Comment = require("../models/comments.js")
var fs = require("fs");

router.get("/", function(req, res) {
  res.send("home");
});

router.get("/story", pagination, function(req, res) {
  console.log(res.re.results);
  if (res.re.results[0]) {
    res.json(res.re);
  } else res.json("Zero stories available");

});

router.post("/story", upload.array('image'), (req, res) => {
  var st = new Story({
    caption: req.body.caption
  });
  cloudinary.uploader.upload(req.files[0].destination + "/" + req.files[0].filename, function(result, error) {
    if (result) {
      cloudinary.uploader.upload(req.files[1].destination + "/" + req.files[1].filename, (result2, err) => {
        if (result2) {
          var obj = {},
            obj2 = {};
          obj["url"] = result.url;
          obj2["url"] = result2.url;
          obj["publicid"] = result.public_id;
          obj2["publicid"] = result2.public_id;
          st["im1"] = obj;
          st["im2"] = obj2;
          st.save(function(e, s) {
            if (e) console.log(e);
            else {
              // console.log(s);
              fs.unlink(req.files[0].destination + "/" + req.files[0].filename, function(errors) {
                if (err) console.log(errors);
              });
              fs.unlink(req.files[1].destination + "/" + req.files[1].filename, function(errorsw) {
                if (errorsw) console.log(errorsw);
              });
              res.json("Succesffuly submitted");

            }
          })

        } else {
          console.log(err);
        }
      });

    } else {
      console.log(error);
    }
  });
});




router.delete("/story", function(req, res) {
  var id1 = [];
  var id2 = [];
  Story.find({}, function(err, sol) {
    for (var i = 0; i <= sol.length - 1; i++) {
      id1[i] = sol[i].im1.publicid;
      id2[i] = sol[i].im2.publicid;
    }
    cloudinary.api.delete_resources(id1, function(result, error) {
      if (error) console.log(error);
      else {
        console.log(result);
        cloudinary.api.delete_resources(id2, function(r, e) {
          if (e) console.log(e);
          else {
            console.log(r);
            Story.deleteMany({}, function(er) {
              if (er) console.log(er);
              else {
                Comment.deleteMany({},function(rr,ss){
                  if(rr) console.log(rr);
                  else{
                      res.json("Successfully deleted all the stories");
                  }
                })

              }
            });
          }
        });
      }
    });
  });
});

function pagination(req, res, next) {
  var start = parseInt(req.query.page - 1) * parseInt(req.query.limit);
  var limit = parseInt(req.query.limit);
  var end = start + parseInt(req.query.limit);
  var results = {};
  res.re = results;

  if (start > 0) {
    results.prev = {
      page: req.query.page - 1,
      limit: req.query.limit
    }
  }
  Story.find({}).populate("comments").exec(function(err, sol) {
    var a = sol.slice(start, end);
    results.results = a;
    if (sol.length - 1 > end - 1) {
      results.next = {
        page: parseInt(req.query.page) + 1,
        limit: req.query.limit
      }
    }
    next();
  });
}

module.exports = router;
