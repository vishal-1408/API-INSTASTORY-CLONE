var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Story = require("../models/story.js");
var Comment = require("../models/comments.js");


router.post("/story/:id",function(req,res){
  var data = {};
  data.name = req.body.name;
  data.content = req.body.content;
  Comment.create(data,function(err,sol){
    if(err) console.log(err);
    else{
      Story.findById(req.params.id,function(e,s){
        if(e) console.log(e);
        else{
            s.comments.push(sol);
            s.save(function(error,solution){
              if(error) console.log(error);
              else{
                  res.redirect("/story/"+req.params.id);
              }
            })

        }

      });
    }

  });
});

router.put("/story/:id/comments/:id2",function(req,res){
  var data = {};
  if(req.body.name) data.name = req.body.name;
  if(req.body.content) data.content = req.body.content;
  Comment.findByIdAndUpdate(req.params.id2,data,function(err,sol){
    if(err) console.log(err);
    else{
        res.redirect("/story/"+req.params.id);
    }
  })
});

router.delete("/story/:id/comments/:id2",function(req,res){
  Comment.findByIdAndRemove(req.params.id2,function(er){
    if(er) console.log(er);
    else{
      res.redirect("/story/"+req.params.id);
    }
  })
});

router.delete("/story/:id/comments",function(req,res){
  Comment.deleteMany({},function(e,s){
    if(e) console.log(e);
    else{
    res.redirect("/story/"+req.params.id);
    }
  })
})

module.exports = router;
