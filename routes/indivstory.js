var express = require("express");
var router = express.Router();
var upload = require("../multer.js");
var Story = require("../models/story.js");
var cloudinary = require("../cloudinary.js");
var Comment = require("../models/comments.js")
var fs = require("fs");

router.get("/story/:id", function(req, res) {
  Story.findById(req.params.id).populate("comments").exec(function(err, sol) {
    if (err) console.log(err);
    else {
      res.json(sol);
    };
  })
})



router.put("/story/:id", upload.array("image"), function(req, res) {
  var id = req.params.id;
  Story.findById(id, function(err, sol) {
    if (err) console.log(err);
    else {
      if (req.body.caption) {
        console.log(sol);
        sol.caption = req.body.caption;
        console.log(sol);
      }
      if (req.files.length == 2) {
        cloudinary.uploader.upload(req.files[0].destination + "/" + req.files[0].filename, function(s, e) {
          if (e) console.log(e);
          else {
            cloudinary.uploader.upload(req.files[1].destination + "/" + req.files[1].filename, function(so, er) {
              if (er) console.log(er);
              else {
                fs.unlink(req.files[0].destination + "/" + req.files[0].filename, function(errorsww) {
                  if (errorsww) console.log(errorsww);
                });
                fs.unlink(req.files[1].destination + "/" + req.files[1].filename, function(errorsw) {
                  if (errorsw) console.log(errorsw);
                });
                cloudinary.uploader.destroy(sol["im1"].publicid, function(results, errors) {
                  if (errors) console.log(errors);
                  else {
                    cloudinary.uploader.destroy(sol["im2"].publicid, function(result, es) {
                      if (es) console.log(es);
                      else {
                        sol.im1.url = s.url;
                        sol.im1.publicid = s.public_id;
                        sol.im2.url = so.url;
                        sol.im2.publicid = so.public_id;
                        sol.save(function(eq, sl) {
                          if (eq) console.log(eq);
                          else {
                            console.log(sl);
                          }
                        });
                        res.redirect("/story/" + String(id));
                      }
                    });

                  }
                });
              }
            });
          }
        });
      } else if (req.files.length == 1) {
        console.log(req.body.number);
        var n = parseInt(req.body.number);
        cloudinary.uploader.upload(req.files[0].destination + "/" + req.files[0].filename, function(so, er) {
          if (er) console.log(er);
          else {
            fs.unlink(req.files[0].destination + "/" + req.files[0].filename, function(errors) {
              if (err) console.log(errors);
            });
            cloudinary.uploader.destroy(sol["im" + String(n)].publicid, function(results, errors) {
              if (errors) console.log(errors);
              else {
                sol["im" + String(n)].url = so.url;
                sol["im" + String(n)].publicid = so.public_id;
                sol.save(function(eq, sl) {
                  if (eq) console.log(eq);
                  else {
                    res.redirect("/story/" + String(id));
                  }
                });
              }
            });
          }
        });
      } else {
        sol.save(function(e, s) {
          if (e) console.log(e);
          else {
            res.redirect("/story/" + String(id));
          }
        })

      }
    }

  });
});
router.delete("/story/:id", function(req, res) {
  Story.findById(req.params.id, function(er, sol) {
    if (er) console.log(er);
    else {
      cloudinary.uploader.destroy(sol["im1"].publicid, function(results, errors) {
        if (errors) console.log(errors);
        else {
          cloudinary.uploader.destroy(sol["im2"].publicid, function(result, es) {
            if (es) console.log(es);
            else {
              var com = sol.comments;
              console.log(com);
              for(var x of com){
                Comment.findByIdAndRemove(x,function(err){if(err) console.log(err);});
              };
              Story.deleteOne({
                _id: req.params.id
              }, function(e) {
                if (e) console.log(e);
                else {
                  res.redirect("/story?page=1&limit=5");

                }
              });
            }
          });
        }
      });
    }
  });
});

module.exports = router;
